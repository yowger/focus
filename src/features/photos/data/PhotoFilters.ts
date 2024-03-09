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
    { label: "All sizes", value: null },
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
]

export const colorItems: IColorMenuItem<TPhotoColors | null>[] = [
    { label: "All colors", value: null, color: "#FFFFFF" },
    { label: "red", value: "red", color: "#ef4444" },
    { label: "orange", value: "orange", color: "#f97316" },
    { label: "yellow", value: "yellow", color: "#eab308" },
    { label: "green", value: "green", color: "#16a34a" },
    { label: "turquoise", value: "turquoise", color: "#06b6d4" },
    { label: "blue", value: "blue", color: "#3b82f6" },
    { label: "violet", value: "violet", color: "#8b5cf6" },
    { label: "pink", value: "pink", color: "#ec4899" },
    { label: "brown", value: "brown", color: "#d2bab0" },
    { label: "black", value: "black", color: "#000000" },
    { label: "gray", value: "gray", color: "#6b7280" },
    { label: "white", value: "white", color: "#FFFFFF" },
]
