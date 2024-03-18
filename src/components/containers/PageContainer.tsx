import type { ComponentProps, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface IPageContainer {
    children?: ReactNode
    className?: ComponentProps<"div">["className"]
}

export default function PageContainer({ children, className }: IPageContainer) {
    return (
        <div className={twMerge("flex flex-col h-screen", className)}>
            {children}
        </div>
    )
}
