import type { ReactNode } from "react"

export interface IButtonListItem {
    label: ReactNode
    break?: boolean
    function: () => void
}
