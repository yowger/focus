import type { ReactNode } from "react"

export interface IMenuItem<T extends string | null> {
    label: ReactNode
    value: T
}
