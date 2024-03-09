import type { IColorMenuItem, IMenuItem } from "@/components/dropdown/types"
import type {
    TPhotoColors,
    TPhotoOrientations,
    TPhotoSizes,
} from "../types/photoTypes"

export const orientationItems: IMenuItem<TPhotoOrientations | null>[] = [
    { label: "All orientations", value: null },
    { label: "Landscape", value: "landscape" },
    { label: "Portrait", value: "portrait" },
    { label: "square", value: "square" },
]

export const sizeItems: IMenuItem<TPhotoSizes | null>[] = [
    { label: "All Sizes", value: null },
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
]

export const colorItems: IColorMenuItem<TPhotoColors | null>[] = [
    { label: "All Colors", value: null, color: "red" },
    { label: "red", value: "red", color: "red" },
    { label: "orange", value: "orange", color: "red" },
    { label: "yellow", value: "yellow", color: "red" },
    { label: "green", value: "green", color: "red" },
    { label: "turquoise", value: "turquoise", color: "red" },
    { label: "blue", value: "blue", color: "red" },
    { label: "violet", value: "violet", color: "red" },
    { label: "pink", value: "pink", color: "red" },
    { label: "brown", value: "brown", color: "red" },
    { label: "black", value: "black", color: "red" },
    { label: "gray", value: "gray", color: "red" },
    { label: "white", value: "white", color: "red" },
]
