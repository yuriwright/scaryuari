'use client'

import { artworks } from '@/data/artworks'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { useCart } from '@/contexts/CartContext'
import { useParams } from 'next/navigation'

export default function AntiGreetingCardPage() {
    const params = useParams()
    const slug = params?.slug as string
    const { addItem } = useCart()

    // Find the card and its parent artwork
    let foundCard: any = null
    let parentArtwork: any = null

    for (const artwork of artworks) {
        if (artwork.merch?.antiGreetingCards) {
            const card = artwork.merch.antiGreetingCards.find(c => c.slug === slug)
            if (card) {
                foundCard = card
                parentArtwork = artwork
                break
            }
        }
    }

    if (!foundCard || !parentArtwork) {
        notFound()
    }

    // add-to-cart handler
    const handleAddCard = () => {
        addItem({
            id: `antigreeting-${foundCard.slug}`,
            type: 'antiGreetingCard',
            artworkSlug: parentArtwork.slug,
            artworkTitle: parentArtwork.title,
            itemTitle: foundCard.title,
            price: foundCard.price || 0,
            quantity: 1,
            maxStock: foundCard.stock,
            image: foundCard.image || parentArtwork.iconImage,
        })
    }

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'art', href: '/' },
        { label: 'merch', href: '/merch' },
        { label: 'anti greeting cards', href: '/merch/antigreetingcards' },
        { label: foundCard.title },
    ]

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <section id="content" className="my-5">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8">

                        {/* Card Image */}
                        <div className="w-full md:w-1/2 outline outline-pink-500 outline-offset-4 p-2">
                            {foundCard.image ? (
                                <a href={foundCard.image} target="_blank">
                                    <Image
                                        src={foundCard.image}
                                        alt={foundCard.title}
                                        width={900}
                                        height={1200}
                                        className="w-full h-auto"
                                        style={{ maxHeight: '70vh', width: 'auto', margin: '0 auto' }}
                                    />
                                </a>
                            ) : (
                                <div className="bg-stone-800 aspect-square flex items-center justify-center">
                                    <p className="text-red-600 text-sm italic">image coming soon</p>
                                </div>
                            )}
                        </div>

                        {/* Card Info */}
                        <div className="w-full md:w-1/3 bg-stone-900 py-2 px-3 outline outline-pink-500 outline-offset-4">
                            <h3 className="text-red-600 font-mono font-bold underline text-center text-2xl mb-5">
                                <i>"{foundCard.title}"</i>
                            </h3>

                            {/* Original Artwork Link */}
                            <div className="mb-6">
                                <p className="text-red-600 text-center font-mono mb-3 text-sm">
                                    featuring artwork:
                                </p>
                                <Link 
                                    href={`/art/${parentArtwork.slug}`}
                                    className="block text-center"
                                >
                                    <p className="text-red-600 font-mono hover:text-red-400 transition-colors underline">
                                        <i>"{parentArtwork.title}"</i>
                                    </p>
                                </Link>
                            </div>

                            {/* Price & Stock */}
                            {foundCard.price && (
                                <div className="mb-4 text-center">
                                    <p className="text-red-600 font-mono text-xl">
                                        ${foundCard.price}
                                    </p>
                                </div>
                            )}

                            <p className="text-red-600 font-mono text-xs text-center mb-4">
                                <i>({foundCard.stock} in stock)</i>
                            </p>

                            {/* Add to Cart or Sold Out */}
                            <div className="text-center mb-6">
                                {foundCard.stock > 0 ? (
                                    <button
                                        onClick={handleAddCard}
                                        className="bg-red-900 hover:bg-red-700 text-stone border border-red-400 font-bold py-2 px-4 mt-2"
                                    >
                                        add to cart
                                    </button>
                                ) : (
                                    <p className="text-red-600 font-mono italic">
                                        sold out
                                    </p>
                                )}
                            </div>

                            {/* Inquire Button */}
                            <div className="mt-6 pt-6 border-t border-red-600">
                                <div className="text-center">
                                    <button className="bg-red-900 hover:bg-red-700 text-stone border border-red-400 font-bold py-2 px-2 text-sm">
                                        <i>inquire about custom orders</i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
