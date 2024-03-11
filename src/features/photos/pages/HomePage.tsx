import { Fragment, useState } from "react"

import {
    getPhotosData,
    getPhotosLength,
    getTotalPhotosLength,
} from "../utils/photosUtil"
import { useEventListener } from "@/hooks/useEventListener"
import { useInfiniteCuratedPhotos } from "../api/useInfiniteCuratedPhotos"

import Header from "../components/Header"
import Hero from "../components/Hero"
import PhotoList from "../components/PhotoList"
import PhotoModal from "@/components/modal/PhotoModal"
import RenderInfiniteList from "@/components/ui/RenderInfiniteList"

import type { THeaderPosition } from "../components/Header"
import type { IPhoto } from "../types/photoTypes"

function HomePage() {
    const [open, setOpen] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null)
    const [headerPosition, setHeaderPosition] =
        useState<THeaderPosition>("absolute")

    const photosQuery = useInfiniteCuratedPhotos()

    const totalPhotosLength = getTotalPhotosLength(photosQuery)
    const photoLength = getPhotosLength(photosQuery)
    const photos = getPhotosData(photosQuery)

    const handlePhotoClick = (photo: IPhoto) => {
        handleOpen()
        setSelectedPhoto(photo)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const changeHeaderPosition = () => {
        if (window.scrollY >= 500) {
            setHeaderPosition("fixed")
        } else {
            setHeaderPosition("absolute")
        }
    }

    useEventListener("scroll", changeHeaderPosition)

    return (
        <Fragment>
            <Header position={headerPosition} />
            <Hero />

            <div className="flex flex-col max-w-7xl mx-auto px-4">
                <RenderInfiniteList
                    data={photos}
                    dataLength={photoLength}
                    totalDataLength={totalPhotosLength}
                    isLoading={photosQuery.isLoading}
                    isError={photosQuery.isError}
                    hasNextPage={photosQuery.hasNextPage}
                    fetchNextPage={photosQuery.fetchNextPage}
                    renderComponent={(photos) => (
                        <PhotoList
                            photos={photos}
                            onPhotoClick={handlePhotoClick}
                        />
                    )}
                />
            </div>

            <PhotoModal
                isOpen={open}
                onClose={handleClose}
                photo={selectedPhoto}
            />
        </Fragment>
    )
}

export const Component = HomePage

// resent searches
// try again button
