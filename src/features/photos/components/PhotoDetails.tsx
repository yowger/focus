import Button from "@/components/buttons/Button"
import { IconHeartFilled, IconShare } from "@tabler/icons-react"

import { photoDownloadItems } from "../data/PhotoDownloadList"

import ButtonDropdown from "@/components/buttons/ButtonDropdown"

import type { IPhoto } from "../types/photoTypes"

interface IPhotoDetails {
    photo: IPhoto
}

export default function PhotoDetails({ photo }: IPhotoDetails) {
    return (
        <div>
            <div className="flex justify-between mb-5 items-center">
                <p className="text-lg font-medium tracking-wide mr-10 leading-6">
                    {photo?.alt}
                </p>

                <div className="flex gap-3">
                    <Button variant="outline" size="normal">
                        <IconHeartFilled className="text-gray-500" size={20} />
                    </Button>
                    <ButtonDropdown
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
                <div>
                    <Button variant="outline" size="normal">
                        <IconShare className="text-gray-500" size={20} />
                        Share
                    </Button>
                </div>
            </div>
        </div>
    )
}
