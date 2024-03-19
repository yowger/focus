import PhotoItem from "./PhotoItem"

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
                    <PhotoItem
                        key={`photo-item-${index}`}
                        photo={photo}
                        onPhotoClick={onPhotoClick}
                        onLikeCLick={onLikeClick}
                        onDownloadClick={handleDownloadOriginal}
                    />
                )
            })}
        </section>
    )
}
