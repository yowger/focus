import { useEffect } from "react"
import { IconHeartFilled } from "@tabler/icons-react"

import Button from "@/components/buttons/Button"
import ButtonDropdown from "@/components/buttons/ButtonDropdown"

import type { IButtonListItem } from "@/components/buttons/types"
import type { IPhotoWithLiked } from "../types/photoTypes"

interface IPhotoDetails {
    photo: IPhotoWithLiked
    onLikeCLick: (photo: IPhotoWithLiked) => void
    onDownloadImage: (imageUrl: string, imageName: string) => void
}

export default function PhotoDetails({
    photo,
    onLikeCLick,
    onDownloadImage,
}: IPhotoDetails) {
    const photoDownloadItems: IButtonListItem[] = []

    useEffect(() => {
        function createPhotoDownloadItems() {
            Object.entries(photo.src).forEach(([key, imageUrl]) => {
                const imageName = [photo.alt, photo.id, key]
                    .filter(Boolean)
                    .join("-")

                photoDownloadItems.push({
                    label: key,
                    function: () => onDownloadImage(imageUrl, imageName),
                })
            })
        }

        createPhotoDownloadItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photo, photoDownloadItems])

    const handleDownloadOriginal = () => {
        const imageUrl = photo.src.original
        const imageName = [photo.alt, photo.id, "original"]
            .filter(Boolean)
            .join("-")

        onDownloadImage(imageUrl, imageName)
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row md:justify-between mb-5 items-center">
                <p className="text-lg font-medium tracking-wide mr-10 leading-6 text-center md:text-left">
                    {photo?.alt}
                </p>

                <div className="flex gap-3">
                    <Button
                        onClick={() => onLikeCLick(photo)}
                        variant="outline"
                        size="normal"
                    >
                        <IconHeartFilled
                            className={
                                photo.isLiked ? "text-red-500" : "text-gray-500"
                            }
                            size={20}
                        />
                    </Button>
                    <ButtonDropdown
                        buttonFunction={handleDownloadOriginal}
                        buttonLabel="Download free"
                        buttonItemList={photoDownloadItems}
                    />
                </div>
            </div>

            <div className="flex justify-center mb-5">
                <img
                    className="mb-1 min-h-[30vh] max-h-[80vh]"
                    src={photo?.src.large}
                    alt={photo?.alt}
                    loading="lazy"
                />
            </div>

            <div className="flex justify-between items-center">
                <p className="text-neutral-600">
                    Photograph by{" "}
                    <a className="text-blue-500 hover:underline underline-offset-2 cursor-pointer">
                        {photo?.photographer}
                    </a>
                </p>
                {/* <div>
                    <Button variant="outline" size="normal">
                        <IconShare className="text-gray-500" size={20} />
                        Share
                    </Button>
                </div> */}
            </div>
        </div>
    )
}
