import { Fragment, useEffect, useMemo, useState } from "react"

import { useEventListener } from "@/hooks/useEventListener"
import { download } from "@/utils/mediaUtils"
import { useInfiniteCuratedPhotos } from "../api/useInfiniteCuratedPhotos"

import MainContainer from "@/components/containers/MainContainer"
import PageContainer from "@/components/containers/PageContainer"
import Footer from "@/components/layouts/Footer"
import PhotoModal from "@/components/modal/PhotoModal"
import RenderInfiniteList from "@/components/generic/RenderInfiniteList"
import Header from "../../../components/layouts/Header"
import Hero from "../components/Hero"
import PhotoList from "../components/PhotoList"

import type { THeaderPosition } from "../../../components/layouts/Header"
import type { IPhoto, IPhotoWithLiked } from "../types/photoTypes"
import { useLocalStorage } from "@/hooks/useLocalStorage"

function HomePage() {
    const [isOpen, setIsOpen] = useState(false)
    const [hasNext, setHasNext] = useState(false)
    const [hasPrev, setHasPrev] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<IPhotoWithLiked | null>(
        null
    )
    const [headerPosition, setHeaderPosition] =
        useState<THeaderPosition>("absolute")
    const [searchBarStyle, setSearchBarStyle] = useState("opacity-0")

    const photosQuery = useInfiniteCuratedPhotos()

    const [likedPhotos, setLikedPhotos] = useLocalStorage<IPhoto[]>(
        "liked-photos",
        []
    )

    const photos: IPhotoWithLiked[] = useMemo(() => {
        return (
            photosQuery.data?.pages.flatMap((page) =>
                page.photos.map((photo) => ({
                    ...photo,
                    isLiked: likedPhotos.some(
                        (likedPhoto) => likedPhoto.id === photo.id
                    ),
                }))
            ) || []
        )
    }, [photosQuery.data?.pages, likedPhotos])

    const handlePhotoClick = (photo: IPhoto) => {
        handleOpen()

        setSelectedPhoto({
            ...photo,
            isLiked: likedPhotos.some(
                (likedPhoto) => likedPhoto.id === photo.id
            ),
        })
    }

    const handlePhotoLike = (photo: IPhotoWithLiked) => {
        handleLike(photo)

        setSelectedPhoto({
            ...photo,
            isLiked: !photo.isLiked,
        })
    }

    const handleLike = (photo: IPhoto) => {
        setLikedPhotos((likedPhotos) => {
            const photoIndex = likedPhotos.findIndex(
                (likedPhoto) => likedPhoto.id === photo.id
            )

            const photoExist = photoIndex !== -1

            if (photoExist) {
                return likedPhotos.filter((_, index) => index !== photoIndex)
            } else {
                return [...likedPhotos, photo]
            }
        })
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
            setSearchBarStyle("")
        } else {
            setHeaderPosition("absolute")
            setSearchBarStyle("opacity-0")
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
            <Header position={headerPosition} SearchBarStyle={searchBarStyle} />

            <Hero />

            <PageContainer>
                <MainContainer>
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
                                onLikeClick={handleLike}
                                onDownloadImage={handleDownloadImage}
                            />
                        )}
                    />
                </MainContainer>

                <Footer className="mt-8" />
            </PageContainer>

            <PhotoModal
                isOpen={isOpen}
                photo={selectedPhoto}
                hasNext={hasNext}
                hasPrev={hasPrev}
                onClose={handleClose}
                onLikeCLick={handlePhotoLike}
                onDownloadImage={handleDownloadImage}
                onLeftClick={handleLeftClick}
                onRightClick={handleRightClick}
            />
        </Fragment>
    )
}

export const Component = HomePage
