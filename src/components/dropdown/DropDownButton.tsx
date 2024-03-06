import { IconChevronDown } from "@tabler/icons-react"

import type { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface IDropdownButton {
    children?: ReactNode
    isOpen: boolean
    onClick: () => void
}

export default function DropdownButton({
    children,
    isOpen = false,
    onClick,
}: IDropdownButton) {
    return (
        <button
            onClick={onClick}
            className="w-full h-[50px] flex justify-between items-center px-4 text-lg font-medium rounded-md border border-slate-300 hover:border-slate-800"
        >
            {children}
            <span
                className={twMerge(
                    isOpen ? "animate-flip-icon-up" : "animate-flip-icon-down",
                    "text-slate-400"
                )}
            >
                <IconChevronDown />
            </span>
        </button>
    )
}
