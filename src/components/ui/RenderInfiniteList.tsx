import InfiniteScroll from "react-infinite-scroll-component"

import Loader from "./Loader"

import type { ReactNode } from "react"
import type { Props } from "react-infinite-scroll-component"

type TOptions = Omit<Props, "dataLength" | "next" | "hasMore" | "loader">

interface IRenderInfiniteList<T> {
    data: T[]
    dataLength: Props["dataLength"]
    isLoading: boolean
    isError: boolean
    error?: ReactNode
    hasNextPage: Props["hasMore"]
    options?: TOptions
    fetchNextPage: Props["next"]
    renderComponent: (data: T[]) => ReactNode
}

export default function RenderInfiniteList<T>({
    data,
    dataLength,
    isLoading,
    isError,
    error,
    hasNextPage,
    options,
    fetchNextPage,
    renderComponent,
}: IRenderInfiniteList<T>) {
    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return error ? (
            error
        ) : (
            <div className="flex justify-center">
                <p className="text-center text-lg text-red-400">
                    Something went wrong, please try again
                </p>
            </div>
        )
    }

    return (
        <section>
            <InfiniteScroll
                dataLength={dataLength}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={isLoading && <Loader />}
                {...options}
            >
                {renderComponent(data)}
            </InfiniteScroll>
        </section>
    )
}
