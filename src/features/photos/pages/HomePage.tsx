import { Fragment, useEffect, useMemo, useState } from "react"

import { useEventListener } from "@/hooks/useEventListener"
import { download } from "@/utils/mediaUtils"
import { useInfiniteCuratedPhotos } from "../api/useInfiniteCuratedPhotos"

import PhotoModal from "@/components/modal/PhotoModal"
import RenderInfiniteList from "@/components/generic/RenderInfiniteList"
import Header from "../components/Header"
import Hero from "../components/Hero"
import PhotoList from "../components/PhotoList"

import type { THeaderPosition } from "../components/Header"
import type { IPhoto } from "../types/photoTypes"

function HomePage() {
    const [isOpen, setIsOpen] = useState(false)
    const [hasNext, setHasNext] = useState(false)
    const [hasPrev, setHasPrev] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null)
    const [headerPosition, setHeaderPosition] =
        useState<THeaderPosition>("absolute")

    const photosQuery = useInfiniteCuratedPhotos()

    const photos = useMemo(() => {
        return photosQuery.data?.pages.flatMap((page) => page.photos) || []
    }, [photosQuery.data?.pages])

    const handlePhotoClick = (photo: IPhoto) => {
        handleOpen()
        setSelectedPhoto(photo)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleOpen = () => {
        setIsOpen(true)
    }

    const changeHeaderPosition = () => {
        if (window.scrollY >= 500) {
            setHeaderPosition("fixed")
        } else {
            setHeaderPosition("absolute")
        }
    }

    const handleDownloadImage = (imageUrl: string, imageName: string) => {
        download(imageUrl, imageName)
    }

    const handleLeftClick = () => {
        if (!selectedPhoto) return

        const photoIndex = photos.findIndex(
            (photo) => photo.id === selectedPhoto.id
        )

        const prevPhotoIndex = photos[photoIndex - 1]

        setSelectedPhoto(prevPhotoIndex)
    }

    const handleRightClick = () => {
        if (!selectedPhoto) return

        const photoIndex = photos.findIndex(
            (photo) => photo.id === selectedPhoto.id
        )

        const nextPhotoIndex = photos[photoIndex + 1]

        setSelectedPhoto(nextPhotoIndex)

        if (photos.length - 5 === photoIndex && photosQuery.hasNextPage) {
            photosQuery.fetchNextPage()
        }
    }

    useEffect(() => {
        if (selectedPhoto) {
            const photoIndex = photos.findIndex(
                (photo) => photo.id === selectedPhoto.id
            )

            const nextPhotoExist = photos[photoIndex + 1] !== undefined
            const nextPrevExist = photos[photoIndex - 1] !== undefined

            setHasNext(nextPhotoExist)
            setHasPrev(nextPrevExist)
        }
    }, [selectedPhoto, photos])

    useEventListener("scroll", changeHeaderPosition)

    return (
        <Fragment>
            <Header position={headerPosition} />
            <Hero />

            <div className="flex flex-col max-w-7xl mx-auto px-4">
                <RenderInfiniteList
                    data={photos}
                    dataLength={photos.length}
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
                isOpen={isOpen}
                photo={selectedPhoto}
                hasNext={hasNext}
                hasPrev={hasPrev}
                onClose={handleClose}
                onDownloadImage={handleDownloadImage}
                onLeftClick={handleLeftClick}
                onRightClick={handleRightClick}
            />
        </Fragment>
    )
}

export const Component = HomePage

// resent searches
// try again button
