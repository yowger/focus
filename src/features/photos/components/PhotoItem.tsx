import { IconArrowDown, IconHeartFilled } from "@tabler/icons-react"

import Button from "@/components/buttons/Button"

import type { IPhotoWithLiked } from "../types/photoTypes"

interface IPhotoItemProps {
    photo: IPhotoWithLiked
    isLiked?: boolean
    onPhotoClick: (photo: IPhotoWithLiked) => void
    onLikeCLick: (photo: IPhotoWithLiked) => void
    onDownloadClick: (photo: IPhotoWithLiked) => void
}

export default function PhotoItem({
    photo,
    onPhotoClick,
    onLikeCLick,
    onDownloadClick,
}: IPhotoItemProps) {
    return (
        <div
            onClick={(event) => {
                event.stopPropagation()
                onPhotoClick(photo)
            }}
            className="relative cursor-zoom-in group bg-slate-50"
        >
            <img
                src={photo.src.large}
                alt={photo.alt}
                className="object-cover object-center w-full aspect-[4/3] max-w-full rounded-sm"
                loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/25 via-transparent to-gray-800/50 opacity-0 group-hover:opacity-100 duration-150 rounded-sm" />

            <div className="opacity-0 group-hover:opacity-100 absolute flex flex-col justify-between p-3  top-0 left-0 w-full h-full">
                <div className="flex-1 flex justify-end">
                    <Button
                        onClick={(event) => {
                            event.stopPropagation()
                            onLikeCLick(photo)
                        }}
                        variant="white"
                        size="small"
                    >
                        <IconHeartFilled
                            size="20"
                            className={photo.isLiked ? "text-red-500" : ""}
                        />
                    </Button>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-white text-sm cursor-pointer">
                        {photo.photographer}
                    </span>
                    <Button
                        onClick={(event) => {
                            event.stopPropagation()
                            onDownloadClick(photo)
                        }}
                        variant="white"
                        size="small"
                    >
                        <IconArrowDown size="20" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
