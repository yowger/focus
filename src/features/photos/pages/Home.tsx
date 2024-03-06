import { useState } from "react"

import { useEventListener } from "@/hooks/useEventListener"
import { useInfinitePhotos } from "../api/useInfinitePhotos"

import Header from "../components/Header"
import Hero from "../components/Hero"
import PhotoSection from "../components/PhotoSection"

import type { THeaderPosition } from "../components/Header"

function Home() {
    const [headerPosition, setHeaderPosition] =
        useState<THeaderPosition>("absolute")

    const photos = useInfinitePhotos({ query: "dog" })

    const changeHeaderPosition = () => {
        if (window.scrollY >= 500) {
            setHeaderPosition("fixed")
        } else {
            setHeaderPosition("absolute")
        }
    }

    useEventListener("scroll", changeHeaderPosition)

    return (
        <div className="">
            <Header position={headerPosition} />
            <Hero />
            <div className="flex flex-col max-w-7xl mx-auto px-4">
                <PhotoSection photos={photos} />
            </div>
        </div>
    )
}

export const Component = Home

// resent searches
// try again button
