// app/merch/page.tsx
import { artworks } from '@/data/artworks'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function MerchPage() {
  // Get the first anti greeting card for the preview image
  const firstCard = artworks
    .find(artwork => artwork.merch?.antiGreetingCards && artwork.merch.antiGreetingCards.length > 0)
    ?.merch?.antiGreetingCards?.[0]

  // Count total anti greeting cards
  const totalCards = artworks
    .filter(artwork => artwork.merch?.antiGreetingCards)
    .reduce((total, artwork) => total + artwork.merch!.antiGreetingCards!.length, 0)

  const breadcrumbItems = [
    { label: 'art', href: '/' },
    { label: 'merch' }
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <section className="my-5">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-red-600 font-mono font-bold text-center text-3xl mb-8">
            <i>merch</i>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Anti Greeting Cards */}
            <Link 
              href="/merch/antigreetingcards"
              className="bg-stone-900 outline outline-pink-500 outline-offset-4 p-6 hover:outline-red-400 transition-colors"
            >
              {/* Card Image */}
              <div className="mb-4 aspect-square flex items-center justify-center bg-stone-800">
                {firstCard?.image ? (
                  <Image
                    src={firstCard.image}
                    alt="anti greeting cards"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-red-600 text-sm italic">image coming soon</p>
                )}
              </div>

              {/* Category Info */}
              <h2 className="text-red-600 font-mono text-center text-xl mb-2">
                <i>anti greeting cards</i>
              </h2>
              
              <p className="text-red-600 font-mono text-xs text-center">
                {totalCards} {totalCards === 1 ? 'design' : 'designs'} available
              </p>
            </Link>

            {/* Future: Stickers (commented out for now) */}
            {/* 
            <Link 
              href="/merch/stickers"
              className="bg-stone-900 outline outline-pink-500 outline-offset-4 p-6 hover:outline-red-400 transition-colors"
            >
              <div className="mb-4 aspect-square flex items-center justify-center bg-stone-800">
                <p className="text-red-600 text-sm italic">coming soon</p>
              </div>
              <h2 className="text-red-600 font-mono text-center text-xl mb-2">
                <i>stickers</i>
              </h2>
            </Link>
            */}
          </div>
        </div>
      </section>
    </>
  )
}