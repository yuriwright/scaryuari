// Home page
import { artworks } from '@/data/artworks'
import ArtCard from '@/components/ui/ArtCard'

export default function HomePage() {
  return (
    <section id="art-cards" className="my-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {artworks.toReversed().map((artwork) => (
            <ArtCard key={artwork.id} artwork={artwork} />
         ))}
        </div>
      </div>
    </section>
  )
}