import type { PropsWithChildren } from "react"

interface ITitle extends PropsWithChildren {}

export default function Title({ children }: ITitle) {
    return <h1 className="text-5xl font-medium text-slate-800">{children}</h1>
}
