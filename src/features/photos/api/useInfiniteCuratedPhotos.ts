import { useInfiniteQuery } from "@tanstack/react-query"

import { axiosInstance } from "@/lib/axios"

import type { InfiniteQueryConfig } from "@/lib/reactQuery"
import type { IPaginationParams, IPhotos } from "../types/photoTypes"

interface IGetCuratedPhotosParams extends IPaginationParams {}

export const getCuratedPhotos = ({
    page = 1,
    per_page = 15,
}: IGetCuratedPhotosParams): Promise<IPhotos> => {
    return axiosInstance.get("/curated", {
        params: { page, per_page },
    })
}

export const useInfiniteCuratedPhotos = (
    config?: InfiniteQueryConfig<IPhotos>
) => {
    return useInfiniteQuery({
        queryKey: ["curated-photos"],
        queryFn: ({ pageParam }) =>
            getCuratedPhotos({
                page: pageParam as number,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage: IPhotos) => {
            return lastPage?.next_page ? lastPage.page + 1 : undefined
        },
        ...config,
    })
}
