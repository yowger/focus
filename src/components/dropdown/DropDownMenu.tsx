import type { ReactNode } from "react"

interface IDropDownMenu {
    children: ReactNode
}

export default function DropDownMenu({ children }: IDropDownMenu) {
    return (
        <div className="w-full text-lg font-medium rounded-md border border-slate-300 duration-150 mt-2 absolute z-50">
            {children}
        </div>
    )
}
