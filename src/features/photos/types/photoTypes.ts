export interface IPaginationParams {
    per_page?: number
    page?: number
}

interface IPaginationObject {
    page: number
    per_page: number
    next_page: number
    total_results: number
}

export interface IPhoto {
    id: number
    width: number
    height: number
    url: string
    photographer: string
    photographer_url: string
    photographer_id: number
    avg_color: string | null
    src: {
        original: string
        large2x: string
        large: string
        medium: string
        small: string
        portrait: string
        landscape: string
        tiny: string
    }
    liked: boolean
    alt: string
}

export type IPhotos = IPaginationObject & { photos: IPhoto[] }

export type IPhotosWithTotalResults = IPhotos & { total_results: number }
