import { Fragment, useState } from "react"
import { useParams } from "react-router-dom"

import { useInfinitePhotos } from "../api/useInfinitePhotos"

import PhotoModal from "@/components/modal/PhotoModal"
import { Filter, Header, PhotoSection, Title } from "../components"

import type { IColorMenuItem, IMenuItem } from "@/components/dropdown/types"
import type {
    IPhoto,
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
    const [open, setOpen] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null)
    const [photoFilters, setPhotoFilters] = useState<IPhotoFilters>({
        orientation: null,
        size: null,
        color: null,
    })

    const { query = "" } = useParams()
    const photos = useInfinitePhotos({
        query,
        color: photoFilters.color,
        orientation: photoFilters.orientation,
        size: photoFilters.size,
    })

    const handlePhotoClick = (photo: IPhoto) => {
        handleOpen()
        setSelectedPhoto(photo)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
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

    return (
        <Fragment>
            <Header position="fixed" />

            <div className="flex flex-col max-w-7xl mx-auto px-4 mt-20 gap-8">
                <Title>{query}</Title>

                <Filter
                    onSelectOrientation={handleSelectOrientation}
                    onSelectSize={handleSelectSize}
                    onSelectColor={handleSelectColor}
                />

                <PhotoSection photos={photos} onPhotoClick={handlePhotoClick} />
            </div>

            <div className="mt-20">footer</div>

            <PhotoModal
                isOpen={open}
                onClose={handleClose}
                photo={selectedPhoto}
            />
        </Fragment>
    )
}

export const Component = SearchPage

// apply url when updating filter
