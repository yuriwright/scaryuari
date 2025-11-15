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
  const [isProcessingRedirect, setIsProcessingRedirect] = useState(false)
  
  // Customer information state
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [country, setCountry] = useState('US')
  const [phoneNumber, setPhoneNumber] = useState('')

  // Redirect if cart is empty, but only if not in the middle of processing a payment
  useEffect(() => {
    if (items.length === 0 && !isProcessingRedirect) {
      router.push('/cart')
    }
  }, [items, router, isProcessingRedirect])

  // Initialize Square payment form
  useEffect(() => {
  console.log('useEffect triggered!', { 
    windowUndefined: typeof window === 'undefined', 
    itemsLength: items.length 
  })
  
  if (typeof window === 'undefined' || items.length === 0) {
    console.log('Early return from useEffect')
    return
  }

  let cardElement: any = null
  let isInitialized = false

  const initializeSquare = async () => {
    console.log('initializeSquare function called!')
  if (isInitialized) return
  isInitialized = true

  try {
    // Clear any existing content first
    const container = document.getElementById('card-container')
    if (container) {
      container.innerHTML = ''
    }

    // Debug environment variables
    console.log('App ID:', process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID)
    console.log('Location ID:', process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID)

    // Load Square Web SDK
    if (!(window as any).Square) {
      console.log('Loading Square.js script...')
      const script = document.createElement('script')
      script.src = 'https://web.squarecdn.com/v1/square.js'
      script.async = true
      document.body.appendChild(script)
      
      await new Promise((resolve, reject) => {
        script.onload = () => {
          console.log('Square.js script loaded successfully')
          resolve(true)
        }
        script.onerror = () => {
          console.error('Failed to load Square.js script')
          reject(new Error('Failed to load Square.js'))
        }
      })
    }

    console.log('Square object:', (window as any).Square)
    console.log('Creating payments with production environment...')

    const payments = (window as any).Square.payments(
      process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
      process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
      'production'
    )

    console.log('Payments object created:', payments)
    console.log('Creating card element...')

    cardElement = await payments.card()
    console.log('Card element created:', cardElement)
    
    await cardElement.attach('#card-container')
    console.log('Card element attached successfully')
    
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

  const validateForm = (): boolean => {
    if (!email) {
      setError('Email is required')
      return false
    }
    
    if (!firstName || !lastName) {
      setError('Name is required')
      return false
    }
    
    if (!addressLine1 || !city || !state || !zipCode) {
      setError('Shipping address is required')
      return false
    }
    
    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address')
      return false
    }
    
    return true
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!card) {
      setError('Payment form not ready')
      return
    }
    
    // Validate customer information form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Tokenize card information
      const result = await card.tokenize()
      
      if (result.status === 'OK') {
        // Send payment and customer info to your API
        const response = await fetch('/api/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: result.token,
            amount: Math.round(totalPrice * 100), // Convert to cents
            items: items,
            customer: {
              email,
              firstName,
              lastName,
              addressLine1,
              addressLine2,
              city,
              state,
              zipCode,
              country,
              phoneNumber
            }
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

            {/* Payment Form with Customer Info */}
            <div>
              <form onSubmit={handlePayment} className="bg-stone-900 outline outline-pink-500 outline-offset-4 p-6">
                {/* Customer Information */}
                <h2 className="text-red-600 font-mono text-xl mb-4">
                  <i>your information</i>
                </h2>

                <div className="mb-6 space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-red-600 font-mono text-sm mb-1">email*</label>
                    <input 
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-stone-800 border border-red-600 text-red-600 font-mono p-2 focus:outline-none focus:border-red-400"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-red-600 font-mono text-sm mb-1">first name*</label>
                      <input 
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full bg-stone-800 border border-red-600 text-red-600 font-mono p-2 focus:outline-none focus:border-red-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-red-600 font-mono text-sm mb-1">last name*</label>
                      <input 
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full bg-stone-800 border border-red-600 text-red-600 font-mono p-2 focus:outline-none focus:border-red-400"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-red-600 font-mono text-sm mb-1">phone number</label>
                    <input 
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-stone-800 border border-red-600 text-red-600 font-mono p-2 focus:outline-none focus:border-red-400"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <h2 className="text-red-600 font-mono text-xl mb-4">
                  <i>shipping address</i>
                </h2>

                <div className="mb-6 space-y-4">
                  <div>
                    <label htmlFor="addressLine1" className="block text-red-600 font-mono text-sm mb-1">address line 1*</label>
                    <input 
                      type="text"
                      id="addressLine1"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      required
                      className="w-full bg-stone-800 border border-red-600 text-red-600 font-mono p-2 focus:outline-none focus:border-red-400"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="addressLine2" className="block text-red-600 font-mono text-sm mb-1">address line 2</label>
                    <input 
                      type="text"
                      id="addressLine2"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="w-full bg-stone-800 border border-red-600 text-red-600 font-mono p-2 focus:outline-none focus:border-red-400"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-red-600 font-mono text-sm mb-1">city*</label>
                      <input 
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full bg-stone-800 border border-red-600 text-red-600 font-mono p-2 focus:outline-none focus:border-red-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-red-600 font-mono text-sm mb-1">state*</label>
                      <input 
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        className="w-full bg-stone-800 border border-red-600 text-red-600 font-mono p-2 focus:outline-none focus:border-red-400"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zipCode" className="block text-red-600 font-mono text-sm mb-1">zip code*</label>
                      <input 
                        type="text"
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                        className="w-full bg-stone-800 border border-red-600 text-red-600 font-mono p-2 focus:outline-none focus:border-red-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-red-600 font-mono text-sm mb-1">country*</label>
                      <input 
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className="w-full bg-stone-800 border border-red-600 text-red-600 font-mono p-2 focus:outline-none focus:border-red-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <h2 className="text-red-600 font-mono text-xl mb-4">
                  <i>payment details</i>
                </h2>

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