import InfiniteScroll from "react-infinite-scroll-component"

import PhotoList from "./PhotoList"

import type { IPhoto } from "../types/photoTypes"

interface IPhotoSectionProps {
    photos: IPhoto[]
    photosLength: number
    totalPhotosLength: number
    isLoading: boolean
    isError: boolean
    hasNextPage: boolean
    onPhotoClick?: (photo: IPhoto) => void
    fetchNextPage: () => void
}

export default function Render({
    photos,
    photosLength,
    totalPhotosLength,
    isLoading,
    isError,
    hasNextPage,
    onPhotoClick,
    fetchNextPage,
}: IPhotoSectionProps) {
    if (isLoading) {
        return <div>is loading...</div>
    }

    if (totalPhotosLength === 0) {
        return <div>No Photos found</div>
    }

    if (isError) {
        return <div>Something went wrong, please try again</div>
    }

    return (
        <section>
            <InfiniteScroll
                dataLength={photosLength}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<p>loading...</p>}
                scrollThreshold="70%"
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <PhotoList photos={photos} onPhotoClick={onPhotoClick} />
            </InfiniteScroll>
        </section>
    )
}
