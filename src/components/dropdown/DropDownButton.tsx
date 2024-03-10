import { IconChevronDown } from "@tabler/icons-react"

import type { ReactNode } from "react"
import { twMerge } from "tailwind-merge"
import Button from "../buttons/Button"

import type { IButtonProps } from "../buttons/Button"

interface IDropdownButton extends IButtonProps {
    children?: ReactNode
    isOpen?: boolean
    onClick?: () => void
}

export default function DropdownButton({
    children,
    isOpen = false,
    onClick,
    ...restProps
}: IDropdownButton) {
    return (
        <Button
            onClick={onClick}
            variant="outline"
            size="large"
            className="w-full justify-between"
            {...restProps}
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
        </Button>
    )
}
