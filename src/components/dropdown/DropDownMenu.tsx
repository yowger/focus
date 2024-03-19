import type { ComponentProps, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface IDropDownMenu {
    className?: ComponentProps<"div">["className"]
    children?: ReactNode
}

export default function DropDownMenu({ className, children }: IDropDownMenu) {
    return (
        <div
            className={twMerge(
                "bg-white rounded-md border border-stone-300 duration-150 mt-2 absolute z-[50] min-w-full w-fit right-0",
                className
            )}
        >
            {children}
        </div>
    )
}
