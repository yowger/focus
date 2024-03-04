import InfiniteScroll from "react-infinite-scroll-component"

import PhotoList from "./PhotoList"

import type {
    InfiniteData,
    UseInfiniteQueryResult,
} from "@tanstack/react-query"
import type { IPhotos } from "../types/photoTypes"

interface IPhotoSectionProps {
    photos: UseInfiniteQueryResult<InfiniteData<IPhotos>>
}

export default function PhotoSection({ photos }: IPhotoSectionProps) {
    const photosTotalLength = photos.data?.pages[0].total_results || 0
    const photosLength =
        photos.data?.pages.reduce((acc, page) => acc + page.photos.length, 0) ||
        0
    const photosData = photos.data?.pages.flatMap((page) => page.photos) || []

    if (photos.isLoading) {
        return <div>is loading...</div>
    }

    if (photosTotalLength === 0) {
        return <div>No Photos found</div>
    }

    if (photos.isError) {
        return <div>Something went wrong, please try again</div>
    }
    return (
        <section>
            <InfiniteScroll
                dataLength={photosLength}
                next={photos.fetchNextPage}
                hasMore={photos.hasNextPage}
                loader={<p>loading...</p>}
                scrollThreshold="70%"
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <PhotoList photos={photosData} />
            </InfiniteScroll>
        </section>
    )
}
