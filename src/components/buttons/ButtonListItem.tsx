import { HTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

const itemStyles = {
    base: "hover:bg-neutral-100 cursor-pointer",
    size: {
        normal: "px-4 py-2 text-base h-[43.4px] whitespace-nowrap font-medium",
    },
}

interface IDropdownButtonItem extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

export default function ButtonListItem({
    children,
    ...restProps
}: IDropdownButtonItem) {
    return (
        <div
            className={twMerge(itemStyles.base, itemStyles.size.normal)}
            {...restProps}
        >
            {children}
        </div>
    )
}
