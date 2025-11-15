'use client'

import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  const breadcrumbItems = [
    { label: 'art', href: '/' },
    { label: 'cart' }
  ]

  if (items.length === 0) {
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <section className="my-5">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-red-600 font-mono font-bold text-center text-3xl mb-8">
              <i>your cart</i>
            </h1>
            <div className="text-center">
              <p className="text-red-600 font-mono mb-6">your cart is empty</p>
              <Link 
                href="/"
                className="inline-block bg-red-900 hover:bg-red-700 text-stone border border-red-400 font-bold font-mono py-2 px-4"
              >
                continue shopping
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <section className="my-5">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-red-600 font-mono font-bold text-center text-3xl mb-8">
            <i>your cart</i>
          </h1>

          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-stone-900 outline outline-pink-500 outline-offset-4 p-4 flex flex-col sm:flex-row gap-4"
              >
                {/* Item Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.itemTitle}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Info */}
                <div className="flex-grow">
                  <h3 className="text-red-600 font-mono font-bold mb-1">
                    {item.itemTitle}
                  </h3>
                  <p className="text-red-600 font-mono text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-red-900 hover:bg-red-700 text-stone border border-red-400 font-bold w-8 h-8"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-red-600 font-mono w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-red-900 hover:bg-red-700 text-stone border border-red-400 font-bold w-8 h-8"
                    disabled={item.quantity >= item.maxStock}
                  >
                    +
                  </button>
                </div>

                {/* Item Subtotal & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <p className="text-red-600 font-mono font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-400 font-mono text-xs underline"
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-stone-900 outline outline-pink-500 outline-offset-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-red-600 font-mono text-xl">total:</span>
              <span className="text-red-600 font-mono text-2xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={clearCart}
                className="flex-1 bg-stone-800 hover:bg-stone-700 text-red-600 border border-red-600 font-bold font-mono py-3"
              >
                clear cart
              </button>
              <Link
                href="/checkout"
                className="flex-1 bg-red-900 hover:bg-red-700 text-stone border border-red-400 font-bold font-mono py-3 text-center"
              >
                proceed to checkout
              </Link>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-6">
            <Link 
              href="/"
              className="text-red-600 hover:text-red-400 font-mono text-sm underline"
            >
              ← continue shopping
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}