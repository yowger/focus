import { useInfinitePhotos } from "../api/useInfinitePhotos"

import Header from "../components/Header"
import Hero from "../components/Hero"
import PhotoSection from "../components/PhotoSection"

export default function Home() {
    const photos = useInfinitePhotos({ query: "dog" })

    return (
        <div className="">
            <Header />
            <Hero />
            <div className="flex flex-col max-w-7xl mx-auto px-4">
                <PhotoSection photos={photos} />
            </div>
        </div>
    )
}

// resent searches
// try again button
