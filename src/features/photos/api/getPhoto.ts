import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/axios"

import type { IPhoto } from "../types/photoTypes"
import type { QueryConfig } from "@/lib/reactQuery"

interface IGetPhotoParams {
    photoId: number | string
}

export const getPhoto = ({ photoId }: IGetPhotoParams): Promise<IPhoto> => {
    return axiosInstance.get(`/photos/${[photoId]}`, {})
}

interface IUsePhotoParams extends IGetPhotoParams {}

export const usePhoto = (
    { photoId }: IUsePhotoParams,
    config?: QueryConfig<IPhoto>
) => {
    return useQuery({
        ...config,
        queryKey: ["photo", photoId],
        queryFn: () => getPhoto({ photoId }),
    })
}
