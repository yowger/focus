import { useQuery } from "@tanstack/react-query"

import { axiosInstance } from "@/lib/axios"

import type { IPaginationParams, IPhotos } from "../types/photoTypes"
import type { QueryConfig } from "@/lib/reactQuery"

interface IGetPhotosParams extends Partial<IPaginationParams> {
    query: string
}

export const getPhotos = ({
    page = 1,
    per_page = 20,
    query,
}: IGetPhotosParams): Promise<IPhotos> => {
    return axiosInstance.get("/search", {
        params: { page, per_page, query },
    })
}

interface IUsePhotosParams extends IGetPhotosParams {}

export const usePhotos = (
    { page, per_page, query }: IUsePhotosParams,
    config?: QueryConfig<IPhotos>
) => {
    return useQuery({
        ...config,
        queryKey: ["photos", page, per_page, query],
        queryFn: () => getPhotos({ page, per_page, query }),
    })
}
