'use client'

import { artworks } from '@/data/artworks'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import {useCart } from '@/contexts/CartContext'
import { use } from 'react'

type Props = {
    params: Promise<{
        slug: string
    }>
}

export default function ArtPage({ params }: Props) {
    const { slug } = use(params)
    const artwork = artworks.find(art => art.slug === slug)
    const { addItem } = useCart() 

    if (!artwork) {
        notFound()
    }

    // breadcrumb items
    const breadcrumbItems = [
        { label: 'art', href: '/' },
        { label: artwork.title } // current page - no href
    ]

    // check if prints are available
    const hasPrints = artwork.prints && artwork.prints.length > 0
    const allPrintsOutOfStock = hasPrints && artwork.prints!.every(print => print.stock === 0)
    const shouldShowPrintInquiry = !hasPrints || allPrintsOutOfStock

      // check if merch is available
    const hasAntiGreetingCards = artwork.merch?.antiGreetingCards && artwork.merch.antiGreetingCards.length > 0
    const hasStickers = artwork.merch?.stickers && artwork.merch.stickers.length > 0
    const hasMerch = hasAntiGreetingCards || hasStickers

    // handling adding a print 
    const handleAddPrint = (print: typeof artwork.prints[0], index: number) => {
        addItem({
            id: `print-${artwork.slug}-${index}`,
            type: 'print',
            artworkSlug: artwork.slug,
            artworkTitle: artwork.title,
            itemTitle: `${artwork.title}, ${print.size} print`,
            price: print.price || 0,
            quantity: 1,
            maxStock: print.stock,
            image: artwork.iconImage
        })
    }

    return (
        <>
        <Breadcrumb items={breadcrumbItems} />
        <section id="content" className="my-5">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">

                    {/* Art Image */}
                    <div className="w-full md:w-1/2 outline outline-pink-500 outline-offset-4 p-2">
                        <a href={artwork.fullImage || artwork.iconImage} target="_blank">
                            <Image
                                src={artwork.fullImage || artwork.iconImage}
                                alt={artwork.title}
                                width={900}
                                height={1200}
                                className="w-full h-auto"
                                style={{ maxHeight: '70vh', width: 'auto', margin: '0 auto' }}
                            />
                        </a>
                    </div>

                    {/* Art Info */}
                    <div className="w-full md:w-1/3 bg-stone-900 py-2 px-3 outline outline-pink-500 outline-offset-4">
                        <h3 className="text-red-600 font-mono font-bold underline underline-red text-center text-2xl mb-5">
                            <i>"{artwork.title}"</i>
                        </h3>

                        {/* Prints Section */}
                        {hasPrints && !allPrintsOutOfStock && (
                            <div className="mb-6">
                                <p className="text-red-600 text-center font-mono mb-3">
                                    <i>prints available:</i>
                                </p>
                                {artwork.prints.map((print, index) => (
                                    print.stock > 0 && (
                                    <div key={index} className="text-center font-mono text-xs mb-2">
                                        <p className="text-red-600">
                                            {print.size} print <i>({print.stock} in stock)</i>
                                        </p>
                                        <p className="text-red-600 mb-1">${print.price}</p>
                                        <button 
                                            onClick={() => handleAddPrint(print, index)}
                                            className="bg-red-900 hover:bg-red-700 text-stone border border-red-400 font-bold py-2 px-2 mt-2"
                                        >
                                            add to cart
                                        </button>
                                    </div>
                                    )
                                ))}
                                </div>
                        )}

                        {/* Print Inquiry Button */}
                        {shouldShowPrintInquiry && (
                            <div className="mb-6">
                                <p className="text-red-600 text-center font-mono mb-3">
                                    <i>prints:</i>
                                </p>
                                <div className="text-center">
                                    <button className="bg-red-900 hover:bg-red-700 text-stone border border-red-400 font-bold py-2 px-2 mt-2 text-sm">
                                        <i>inquire about prints</i>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* merch section */}
                        {hasMerch && (
                            <div className="mb-6 pb-6">
                                <p className="text-red-600 border-t border-red-600 text-center font-mono pt-2 my-3 text-sm">
                                    <i>other products with this design:</i>
                                </p>
                                <div className="flex flex-col gap-2">
                                    {hasAntiGreetingCards && (
                                        <Link 
                                            href={`/merch/antigreetingcards/${artwork.merch!.antiGreetingCards![0].slug}`}
                                            className="text-red-600 hover:text-red-400 text-center font-mono text-xs underline transition-colors"
                                        >
                                            anti greeting cards ({artwork.merch!.antiGreetingCards!.reduce((total, card) => total + card.stock, 0)} in stock)
                                        </Link>
                                    )}
                                    {hasStickers && (
                                        <Link 
                                            href="/merch/stickers"
                                            className="text-red-600 hover:text-red-400 text-center font-mono text-xs underline transition-colors"
                                        >
                                            stickers ({artwork.merch!.stickers!.length})
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Original Section */}
                        {artwork.original && (
                            <div className="mt-6 pt-6 border-t border-red-600">
                                <p className="text-red-600 font-mono text-center font-bold mb-3">
                                    original:
                                </p>
                                {artwork.original.available ? (
                                    <>
                                    {artwork.original.dimensions && (
                                        <p className="text-red-600 text-center text-sm mb-2">
                                            {artwork.original.dimensions}
                                        </p>
                                    )}
                                    <div className="text-center">
                                        <button className="bg-red-900 hover:bg-red-700 text-stone border border-red-400 font-bold py-2 px-2 mt-2 text-sm">
                                            <i>inquire about original</i>
                                        </button>
                                    </div>
                                    </>
                                ) : (
                                    <p className="text-red-600 font-mono text-center italic">
                                        original sold
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Additional Info */}
                        {(artwork.medium || artwork.year) && (
                            <div className="mt-8 pt-6 border-t border-red-600">
                                <p className="text-red-600 font-mono text-center text-sm">
                                    {artwork.medium}
                                    {artwork.medium && artwork.year && ' | '}
                                    {artwork.year}
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    </>
    )
}

                            
                    
                    

         
