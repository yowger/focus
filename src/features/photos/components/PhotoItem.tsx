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
            onClick={() => onPhotoClick(photo)}
            className="relative cursor-zoom-in group bg-slate-50"
        >
            <img
                src={photo.src.large}
                alt={photo.alt}
                className="object-cover object-center w-full aspect-[4/3] max-w-full rounded-sm"
                loading="lazy"
            />
            <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex flex-col justify-between p-3 z-40">
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
                    <a className="text-white text-sm cursor-pointer">
                        {photo.photographer}
                    </a>
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
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/25 via-transparent to-gray-800/50 opacity-0 group-hover:opacity-100 duration-150 rounded-sm" />
        </div>
    )
}
