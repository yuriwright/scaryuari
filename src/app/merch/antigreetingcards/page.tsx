import { artworks } from '@/data/artworks'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function AntiGreetingCardsPage() {
  // Collect all anti greeting cards from all artworks
  const allCards = artworks
    .filter(artwork => artwork.merch?.antiGreetingCards)
    .flatMap(artwork => 
      artwork.merch!.antiGreetingCards!.map(card => ({
        ...card,
        artworkTitle: artwork.title,
        artworkSlug: artwork.slug,
        artworkImage: artwork.iconImage
      }))
    )

  const breadcrumbItems = [
    { label: 'art', href: '/' },
    { label: 'merch', href: '/merch' },
    { label: 'anti greeting cards' }
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <section className="my-5">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-red-600 font-mono font-bold text-center text-3xl mb-8">
            <i>anti greeting cards</i>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allCards.map((card, index) => (
              <Link 
                key={index} 
                href={`/merch/antigreetingcards/${card.slug}`}
                className="bg-stone-900 outline outline-pink-500 outline-offset-4 p-4 hover:outline-red-400 transition-colors"
              >
                {/* Card Image */}
                <div className="mb-4 bg-stone-800 aspect-square flex items-center justify-center">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={`${card.title} - ${card.artworkTitle}`}
                      width={300}
                      height={300}
                      className="w-full h-auto"
                    />
                  ) : (
                    <p className="text-red-600 text-sm italic">image coming soon</p>
                  )}
                </div>

                {/* Card Info */}
                <h3 className="text-red-600 font-mono text-center mb-2">
                  <i>{card.title}</i>
                </h3>
                
                <p className="text-red-600 font-mono text-xs text-center mb-2">
                  from: "{card.artworkTitle}"
                </p>

                {card.price && (
                  <p className="text-red-600 font-mono text-center mb-2">
                    ${card.price}
                  </p>
                )}

                <p className="text-red-600 font-mono text-xs text-center">
                  <i>({card.stock} in stock)</i>
                </p>
              </Link>
            ))}
          </div>

          {allCards.length === 0 && (
            <p className="text-red-600 font-mono text-center italic">
              no anti greeting cards available yet
            </p>
          )}
        </div>
      </section>
    </>
  )
}