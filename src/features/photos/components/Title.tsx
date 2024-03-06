import type { ReactNode } from "react"

interface ITitle {
    children: ReactNode
}

export default function Title({ children }: ITitle) {
    return (
        <h1 className="text-5xl font-medium text-slate-800">
            <span className="capitalize">{children}</span> images
        </h1>
    )
}
