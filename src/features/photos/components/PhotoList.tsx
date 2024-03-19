import PhotoItem from "./PhotoItem"
import { Link } from "react-router-dom"

import type { IPhotoWithLiked } from "../types/photoTypes"

interface IPhotoListProps {
    photos: IPhotoWithLiked[]
    isLiked?: boolean
    onPhotoClick: (photo: IPhotoWithLiked) => void
    onLikeClick: (photo: IPhotoWithLiked) => void
    onDownloadImage: (imageUrl: string, imageName: string) => void
}

export default function PhotoList({
    photos,
    onPhotoClick,
    onLikeClick,
    onDownloadImage,
}: IPhotoListProps) {
    const handleDownloadOriginal = (photo: IPhotoWithLiked) => {
        const imageUrl = photo.src.original
        const imageName = [photo.alt, photo.id, "original"]
            .filter(Boolean)
            .join("-")

        onDownloadImage(imageUrl, imageName)
    }

    return (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {photos.map((photo, index) => {
                return (
                    <Link
                        key={`photo-item-${index}`}
                        to={`photo/${photo.id}`}
                        onClick={(event) => {
                            event.preventDefault()
                            if (event.button !== 1) {
                                event.preventDefault()
                            }
                        }}
                    >
                        <PhotoItem
                            photo={photo}
                            onPhotoClick={onPhotoClick}
                            onLikeCLick={onLikeClick}
                            onDownloadClick={handleDownloadOriginal}
                        />
                    </Link>
                )
            })}
        </section>
    )
}
