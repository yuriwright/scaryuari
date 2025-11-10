'use client'

import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [card, setCard] = useState<any>(null)
  const [isProcessingRedirect, setIsProcessingRedirect] = useState(false) // Add this state

  // Redirect if cart is empty, but only if not in the middle of processing a payment
  useEffect(() => {
    if (items.length === 0 && !isProcessingRedirect) {
      router.push('/cart')
    }
  }, [items, router, isProcessingRedirect])

  // Initialize Square payment form
useEffect(() => {
  if (typeof window === 'undefined' || items.length === 0) return

  let cardElement: any = null
  let isInitialized = false

  const initializeSquare = async () => {
    if (isInitialized) return
    isInitialized = true

    try {
      // Clear any existing content first
      const container = document.getElementById('card-container')
      if (container) {
        container.innerHTML = ''
      }

      // Load Square Web SDK
      if (!(window as any).Square) {
        const script = document.createElement('script')
        script.src = 'https://sandbox.web.squarecdn.com/v1/square.js'
        script.async = true
        document.body.appendChild(script)
        
        await new Promise((resolve) => {
          script.onload = resolve
        })
      }

      const payments = (window as any).Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
      )

      cardElement = await payments.card()
      await cardElement.attach('#card-container')
      setCard(cardElement)
    } catch (e) {
      console.error('Square initialization error:', e)
      setError('Failed to load payment form. Please refresh the page.')
    }
  }

  const timeoutId = setTimeout(initializeSquare, 100)

  // Cleanup function
  return () => {
    clearTimeout(timeoutId)
    if (cardElement) {
      try {
        cardElement.destroy()
      } catch (e) {
        console.log('Card cleanup error:', e)
      }
    }
  }
}, [items])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!card) {
      setError('Payment form not ready')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Tokenize card information
      const result = await card.tokenize()
      
      if (result.status === 'OK') {
        // Send payment to your API
        const response = await fetch('/api/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: result.token,
            amount: Math.round(totalPrice * 100), // Convert to cents
            items: items,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          // Payment successful!
          setIsProcessingRedirect(true) // Set this before clearing cart
          
          // Navigate to order confirmation first
          router.push(`/order-confirmation?orderId=${data.orderId}`)
          
          // Clear cart after navigation is initiated
          // Adding a small delay to ensure navigation starts first
          setTimeout(() => {
            clearCart()
          }, 100)
        } else {
          setError(data.error || 'Payment failed. Please try again.')
        }
      } else {
        setError('Card validation failed. Please check your card details.')
      }
    } catch (e) {
      console.error('Payment error:', e)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const breadcrumbItems = [
    { label: 'art', href: '/' },
    { label: 'cart', href: '/cart' },
    { label: 'checkout' }
  ]

  if (items.length === 0 && !isProcessingRedirect) {
    return null // Will redirect
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <section className="my-5">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <h1 className="text-red-600 font-mono font-bold text-center text-3xl mb-8">
            <i>checkout</i>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h2 className="text-red-600 font-mono text-xl mb-4">
                <i>order summary</i>
              </h2>
              
              <div className="bg-stone-900 outline outline-pink-500 outline-offset-4 p-4 space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-stone-700 last:border-0">
                    <Image
                      src={item.image}
                      alt={item.itemTitle}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover"
                    />
                    <div className="flex-grow">
                      <p className="text-red-600 font-mono text-sm font-bold">
                        {item.itemTitle}
                      </p>
                      <p className="text-red-600 font-mono text-xs">
                        from: <i>"{item.artworkTitle}"</i>
                      </p>
                      <p className="text-red-600 font-mono text-xs">
                        qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-mono text-sm font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="pt-3 flex justify-between items-center">
                  <span className="text-red-600 font-mono text-lg font-bold">total:</span>
                  <span className="text-red-600 font-mono text-xl font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link 
                href="/cart"
                className="text-red-600 hover:text-red-400 font-mono text-sm underline"
              >
                ← back to cart
              </Link>
            </div>

            {/* Payment Form */}
            <div>
              <h2 className="text-red-600 font-mono text-xl mb-4">
                <i>payment details</i>
              </h2>

              <form onSubmit={handlePayment} className="bg-stone-900 outline outline-pink-500 outline-offset-4 p-6">
                {/* Square Card Element */}
                <div id="card-container" className="mb-6"></div>

                {error && (
                  <div className="bg-red-900 border border-red-400 text-stone p-3 mb-4 font-mono text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !card}
                  className="w-full bg-red-900 hover:bg-red-700 disabled:bg-stone-700 disabled:text-stone-500 text-stone border border-red-400 font-bold font-mono py-3 transition-colors"
                >
                  {isLoading ? 'processing...' : `pay $${totalPrice.toFixed(2)}`}
                </button>

                <p className="text-red-600 font-mono text-xs text-center mt-4">
                  <i>secure payment powered by square</i>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}