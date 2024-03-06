import { useState } from "react"
import { useParams } from "react-router-dom"

import { useInfinitePhotos } from "../api/useInfinitePhotos"

import Filter from "../components/Filter"
import Header from "../components/Header"
import PhotoSection from "../components/PhotoSection"
import Title from "../components/Title"

import type { IMenuItem } from "@/components/dropdown/types"

interface IPhotoFilters {
    orientation: string | null
    size: string | null
    color: string | null
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

    const handleSelectOrientation = (item: IMenuItem) => {
        setPhotoFilters({
            ...photoFilters,
            orientation: item.value,
        })
    }

    const handleSelectSize = (item: IMenuItem) => {
        setPhotoFilters({
            ...photoFilters,
            size: item.value,
        })
    }

    const handleSelectColor = (item: IMenuItem) => {
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
