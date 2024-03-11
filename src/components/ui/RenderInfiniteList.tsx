import InfiniteScroll from "react-infinite-scroll-component"

import type { ReactNode } from "react"

interface IRenderInfiniteList<T> {
    data: T[]
    dataLength: number
    totalDataLength: number
    isLoading: boolean
    isError: boolean
    hasNextPage: boolean
    fetchNextPage: () => void
    renderComponent: (data: T[]) => ReactNode
}

export default function RenderInfiniteList<T>({
    data,
    dataLength,
    totalDataLength,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    renderComponent,
}: IRenderInfiniteList<T>) {
    if (isLoading) {
        return <div>is loading...</div>
    }

    if (totalDataLength === 0) {
        return <div>No Photos found</div>
    }

    if (isError) {
        return <div>Something went wrong, please try again</div>
    }

    return (
        <section>
            <InfiniteScroll
                dataLength={dataLength}
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
                {renderComponent(data)}
            </InfiniteScroll>
        </section>
    )
}
