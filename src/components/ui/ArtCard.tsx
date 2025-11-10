import Image from 'next/image'
import Link from 'next/link'
import { Artwork } from '@/data/artworks'

type ArtCardProps = {
    artwork: Artwork
}

export default function ArtCard({ artwork }: ArtCardProps) {
    return (
        <div className="mt-3">
            <Link href={`/art/${artwork.slug}`}>
            <div className="border border-gray-900 hover:outline hover:outline-red-950 hover:outline-offset-4 transition-opacity">
                <Image
                    src={artwork.iconImage}
                    alt={artwork.title}
                    width={900}
                    height={1200}
                    className="w-full h-auto aspect-[3/4] object-cover"
                    />

                </div>
            </Link>
        </div>
    )
}