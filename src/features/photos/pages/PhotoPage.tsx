import { useMemo, Fragment } from "react"
import { useParams } from "react-router-dom"

import { useLocalStorage } from "@/hooks/useLocalStorage"
import { download } from "@/utils/mediaUtils"
import { usePhoto } from "../api/getPhoto"

import MainContainer from "@/components/containers/MainContainer"
import PageContainer from "@/components/containers/PageContainer"
import { Header } from "../components"
import PhotoDetails from "../components/PhotoDetails"

import type { IPhoto, IPhotoWithLiked } from "../types/photoTypes"

function PhotoPage() {
    const { photoId = "" } = useParams()

    const [likedPhotos, setLikedPhotos] = useLocalStorage<IPhoto[]>(
        "liked-photos",
        []
    )

    const { data: photo, isLoading: photoIsLoading } = usePhoto({ photoId })

    const photoWithLike: IPhotoWithLiked | null = useMemo(() => {
        return photo
            ? {
                  ...photo,
                  isLiked: likedPhotos.some(
                      (likedPhoto) => likedPhoto.id === photo?.id
                  ),
              }
            : null
    }, [photo, likedPhotos])

    const handleDownloadImage = (imageUrl: string, imageName: string) => {
        download(imageUrl, imageName)
    }

    const handleLike = (photo: IPhoto) => {
        setLikedPhotos((likedPhotos) => {
            const photoIndex = likedPhotos.findIndex(
                (likedPhoto) => likedPhoto.id === photo.id
            )

            const photoExist = photoIndex !== -1

            if (photoExist) {
                return likedPhotos.filter((_, index) => index !== photoIndex)
            } else {
                return [...likedPhotos, photo]
            }
        })
    }

    return (
        <Fragment>
            <Header position="fixed" />

            <PageContainer>
                <MainContainer className="mt-20 gap-8 w-full">
                    {photoIsLoading ? (
                        <p>loading...</p>
                    ) : photoWithLike === null ? (
                        <p>no photos</p>
                    ) : (
                        <PhotoDetails
                            photo={photoWithLike}
                            onDownloadImage={handleDownloadImage}
                            onLikeCLick={handleLike}
                        />
                    )}
                </MainContainer>
            </PageContainer>
        </Fragment>
    )
}

export const Component = PhotoPage
