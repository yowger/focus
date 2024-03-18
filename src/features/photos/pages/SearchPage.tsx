import { Fragment, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { colorItems, orientationItems, sizeItems } from "../data/PhotoFilters"

import { useLocalStorage } from "@/hooks/useLocalStorage"
import { download } from "@/utils/mediaUtils"
import { useInfinitePhotos } from "../api/useInfinitePhotos"

import QueryFilter from "@/components/dropdown/QueryFilter"
import PhotoModal from "@/components/modal/PhotoModal"
import RenderInfiniteList from "@/components/generic/RenderInfiniteList"
import { Header, Title } from "../components"
import PhotoList from "../components/PhotoList"

import type { IColorMenuItem, IMenuItem } from "@/components/dropdown/types"
import type {
    IPhoto,
    IPhotoWithLiked,
    TPhotoColors,
    TPhotoOrientations,
    TPhotoSizes,
} from "../types/photoTypes"

interface IPhotoFilters {
    color: TPhotoColors | null
    orientation: TPhotoOrientations | null
    size: TPhotoSizes | null
}

function SearchPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [hasNext, setHasNext] = useState(false)
    const [hasPrev, setHasPrev] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<IPhotoWithLiked | null>(
        null
    )
    const [photoFilters, setPhotoFilters] = useState<IPhotoFilters>({
        orientation: null,
        size: null,
        color: null,
    })

    const { query = "" } = useParams()
    const photosQuery = useInfinitePhotos({
        query,
        color: photoFilters.color,
        orientation: photoFilters.orientation,
        size: photoFilters.size,
    })

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

    const totalPhotosLength = useMemo(() => {
        return photosQuery?.data?.pages[0].total_results || 0
    }, [photosQuery.data?.pages])

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

    const handleSelectOrientation = (
        item: IMenuItem<TPhotoOrientations | null>
    ) => {
        setPhotoFilters({
            ...photoFilters,
            orientation: item.value,
        })
    }

    const handleSelectSize = (item: IMenuItem<TPhotoSizes | null>) => {
        setPhotoFilters({
            ...photoFilters,
            size: item.value,
        })
    }

    const handleSelectColor = (item: IColorMenuItem<TPhotoColors | null>) => {
        setPhotoFilters({
            ...photoFilters,
            color: item.value,
        })
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

    return (
        <Fragment>
            <Header position="fixed" />

            <div className="flex flex-col max-w-7xl mx-auto px-4 mt-20 gap-8">
                <Title>
                    <span className="capitalize">{query}</span> images{" "}
                    <span className="text-slate-500 text-4xl">
                        ({totalPhotosLength})
                    </span>
                </Title>

                <div className="grid grid-cols-3 gap-5">
                    <QueryFilter<"default", TPhotoOrientations>
                        menuItems={orientationItems}
                        initialActiveIndex={0}
                        onSelect={handleSelectOrientation}
                    />

                    <QueryFilter<"default", TPhotoSizes>
                        menuItems={sizeItems}
                        initialActiveIndex={0}
                        onSelect={handleSelectSize}
                    />

                    <QueryFilter<"color", TPhotoColors>
                        menuItems={colorItems}
                        initialActiveIndex={0}
                        onSelect={handleSelectColor}
                    />
                </div>

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
            </div>

            <div className="mt-20">footer</div>

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

export const Component = SearchPage
