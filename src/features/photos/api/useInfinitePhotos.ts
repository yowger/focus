import { useInfiniteQuery } from "@tanstack/react-query"

import { axiosInstance } from "@/lib/axios"

import type { InfiniteQueryConfig } from "@/lib/reactQuery"
import type {
    IPaginationParams,
    IPhotos,
    IQueryParams,
} from "../types/photoTypes"

interface IGetPhotosParams extends IPaginationParams, IQueryParams {}

export const getPhotos = ({
    page = 1,
    per_page = 15,
    query,
    orientation,
    size,
    color,
}: IGetPhotosParams): Promise<IPhotos> => {
    return axiosInstance.get("/search", {
        params: { page, per_page, query, orientation, size, color },
    })
}

interface IUseInfinitePhotosParams extends IGetPhotosParams {}

export const useInfinitePhotos = (
    { query, orientation, size, color }: IUseInfinitePhotosParams,
    config?: InfiniteQueryConfig<IPhotos>
) => {
    return useInfiniteQuery({
        queryKey: ["photos", query, orientation, size, color],
        queryFn: ({ pageParam }) =>
            getPhotos({
                page: pageParam as number,
                query,
                orientation,
                size,
                color,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage: IPhotos) => {
            return lastPage?.next_page ? lastPage.page + 1 : undefined
        },
        ...config,
    })
}
