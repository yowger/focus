import type { IMenuItem } from "@/components/dropdown/types"
import type {
    TPhotoColors,
    TPhotoOrientations,
    TPhotoSizes,
} from "../types/photoTypes"

export const orientationItems: IMenuItem<TPhotoOrientations | null>[] = [
    { label: "All orientations", value: null },
    { label: "landscape", value: "landscape" },
    { label: "portrait", value: "portrait" },
    { label: "square", value: "square" },
]

export const sizeItems: IMenuItem<TPhotoSizes | null>[] = [
    { label: "All Sizes", value: null },
    { label: "small", value: "small" },
    { label: "medium", value: "medium" },
    { label: "large", value: "large" },
]

export const colorItems: IMenuItem<TPhotoColors | null>[] = [
    { label: "All Colors", value: null },
    { label: "red", value: "red" },
    { label: "orange", value: "orange" },
    { label: "yellow", value: "yellow" },
    { label: "green", value: "green" },
    { label: "turquoise", value: "turquoise" },
    { label: "blue", value: "blue" },
    { label: "violet", value: "violet" },
    { label: "pink", value: "pink" },
    { label: "brown", value: "brown" },
    { label: "black", value: "black" },
    { label: "gray", value: "gray" },
    { label: "white", value: "white" },
]
