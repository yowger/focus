import type { ComponentProps, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface IMainContainer {
    children: ReactNode
    className?: ComponentProps<"div">["className"]
}

export default function MainContainer({ children, className }: IMainContainer) {
    return (
        <div
            className={twMerge(
                "flex flex-col max-w-7xl mx-auto px-4",
                className
            )}
        >
            {children}
        </div>
    )
}
