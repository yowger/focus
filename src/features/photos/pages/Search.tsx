import { useState } from "react"
import { useParams } from "react-router-dom"

import { useInfinitePhotos } from "../api/useInfinitePhotos"

import { Filter, Header, PhotoSection, Title } from "../components"

import type { IMenuItem } from "@/components/dropdown/types"
import type {
    TPhotoColors,
    TPhotoOrientations,
    TPhotoSizes,
} from "../types/photoTypes"

interface IPhotoFilters {
    color: TPhotoColors | null
    orientation: TPhotoOrientations | null
    size: TPhotoSizes | null
}

function Search() {
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

    const handleSelectColor = (item: IMenuItem<TPhotoColors | null>) => {
        setPhotoFilters({
            ...photoFilters,
            color: item.value,
        })
    }

    return (
        <div className="">
            <Header />

            <div className="flex flex-col max-w-7xl mx-auto px-4 mt-20 gap-8">
                <Title>{query}</Title>

                <Filter
                    onSelectOrientation={handleSelectOrientation}
                    onSelectSize={handleSelectSize}
                    onSelectColor={handleSelectColor}
                />

                <PhotoSection photos={photos} />
            </div>

            <div className="mt-20">footer</div>
        </div>
    )
}

export const Component = Search
