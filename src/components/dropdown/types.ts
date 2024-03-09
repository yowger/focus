import type { ReactNode } from "react"

export type TVariant = "color" | "default"

export interface IMenuItem<T extends string | null> {
    label: ReactNode
    value: T
}

export interface IColorMenuItem<T extends string | null> extends IMenuItem<T> {
    color: string
}

export type TMenuItems<V extends TVariant, T extends string> = V extends "color"
    ? IColorMenuItem<T | null>[]
    : IMenuItem<T | null>[]

export const isColorMenu = <T extends string | null>(
    menuItems: IMenuItem<T>[]
): menuItems is IColorMenuItem<T>[] => {
    return "color" in menuItems[0]
}
