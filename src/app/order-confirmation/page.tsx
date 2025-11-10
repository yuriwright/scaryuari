'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { Suspense } from 'react'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  const breadcrumbItems = [
    { label: 'art', href: '/' },
    { label: 'order confirmation' }
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <section className="my-5">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-stone-900 outline outline-pink-500 outline-offset-4 p-8 text-center">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h1 className="text-red-600 font-mono font-bold text-3xl mb-4">
              <i>order confirmed!</i>
            </h1>

            <p className="text-red-600 font-mono mb-6">
              thank you for your purchase!
            </p>

            {orderId && (
              <div className="mb-6 p-4 bg-stone-800 border border-red-600">
                <p className="text-red-600 font-mono text-sm mb-1">order id:</p>
                <p className="text-red-400 font-mono text-xs break-all">{orderId}</p>
              </div>
            )}

          

            <Link
              href="/"
              className="inline-block bg-red-900 hover:bg-red-700 text-stone border border-red-400 font-bold font-mono py-3 px-6"
            >
              back to gallery
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="text-red-600 text-center">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}