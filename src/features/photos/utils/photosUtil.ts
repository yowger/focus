import type {
    InfiniteData,
    UseInfiniteQueryResult,
} from "@tanstack/react-query"
import type { IPhotos } from "../types/photoTypes"

export const getTotalPhotosLength = (
    photosQuery: UseInfiniteQueryResult<InfiniteData<IPhotos>>
) => {
    if (!photosQuery || !photosQuery.data || !photosQuery.data.pages[0]) {
        return 0
    }

    return photosQuery.data.pages[0].total_results
}

export const getPhotosLength = (
    photosQuery: UseInfiniteQueryResult<InfiniteData<IPhotos>>
) => {
    if (!photosQuery || !photosQuery.data) {
        return 0
    }

    return photosQuery.data.pages.reduce(
        (acc, page) => acc + page.photos.length,
        0
    )
}

export const getPhotosData = (
    photosQuery: UseInfiniteQueryResult<InfiniteData<IPhotos>>
) => {
    if (!photosQuery || !photosQuery.data || !photosQuery.data.pages) {
        return []
    }

    return photosQuery.data.pages.flatMap((page) => page.photos)
}
