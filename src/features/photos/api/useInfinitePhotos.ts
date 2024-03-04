import { useInfiniteQuery } from "@tanstack/react-query"

import { axiosInstance } from "@/lib/axios"

import type { InfiniteQueryConfig } from "@/lib/reactQuery"
import type { IPaginationParams, IPhotos } from "../types/photoTypes"

interface IGetPhotosParams extends Partial<IPaginationParams> {
    query: string
}

export const getPhotos = ({
    page = 1,
    per_page = 12,
    query,
}: IGetPhotosParams): Promise<IPhotos> => {
    return axiosInstance.get("/search", {
        params: { page, per_page, query },
    })
}

interface IUseInfinitePhotosParams extends IGetPhotosParams {}

export const useInfinitePhotos = (
    { query }: IUseInfinitePhotosParams,
    config?: InfiniteQueryConfig<IPhotos>
) => {
    return useInfiniteQuery({
        queryKey: ["photos", query],
        queryFn: ({ pageParam }) =>
            getPhotos({ page: pageParam as number, query }),
        initialPageParam: 0,
        getNextPageParam: (lastPage: IPhotos) => {
            return lastPage?.next_page ? lastPage.page + 1 : undefined
        },
        ...config,
    })
}
