import { Fragment, useEffect, useState } from "react"

import { useLocalStorage } from "@/hooks/useLocalStorage"
import { download } from "@/utils/mediaUtils"

import MainContainer from "@/components/containers/MainContainer"
import PageContainer from "@/components/containers/PageContainer"
import Footer from "@/components/layouts/Footer"
import PhotoModal from "@/components/modal/PhotoModal"
import { Header, Title } from "../components"
import PhotoList from "../components/PhotoList"

import type { IPhoto, IPhotoWithLiked } from "../types/photoTypes"

function LikedPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [hasNext, setHasNext] = useState(false)
    const [hasPrev, setHasPrev] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<IPhotoWithLiked | null>(
        null
    )

    const [likedPhotos, setLikedPhotos] = useLocalStorage<IPhoto[]>(
        "liked-photos",
        []
    )

    const [photos, setPhotos] = useState<IPhotoWithLiked[]>(() =>
        likedPhotos.map((photo) => ({ ...photo, isLiked: true }))
    )

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleDownloadImage = (imageUrl: string, imageName: string) => {
        download(imageUrl, imageName)
    }

    const handlePhotoClick = (photo: IPhoto) => {
        handleOpen()

        setSelectedPhoto({
            ...photo,
            isLiked: likedPhotos.some(
                (likedPhoto) => likedPhoto.id === photo.id
            ),
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

    const handlePhotoLike = (photo: IPhotoWithLiked) => {
        handleLike(photo)

        setSelectedPhoto({
            ...photo,
            isLiked: !photo.isLiked,
        })
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
    }

    useEffect(() => {
        setPhotos((prevPhotos) =>
            prevPhotos.map((photo) => ({
                ...photo,
                isLiked: likedPhotos.some(
                    (likedPhoto) => likedPhoto.id === photo.id
                ),
            }))
        )
    }, [likedPhotos])

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

    return (
        <Fragment>
            <Header position="fixed" />

            <PageContainer>
                <MainContainer className="mt-20 gap-8 flex-1">
                    <Title>
                        Your likes{" "}
                        <span className="text-slate-500 text-4xl">
                            ({photos.length})
                        </span>
                    </Title>

                    <PhotoList
                        photos={photos}
                        onPhotoClick={handlePhotoClick}
                        onLikeClick={handleLike}
                        onDownloadImage={handleDownloadImage}
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

export const Component = LikedPage
