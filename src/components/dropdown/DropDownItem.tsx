import { IconCheck } from "@tabler/icons-react"
import { twMerge } from "tailwind-merge"

import { ReactNode } from "react"

interface IDropDownItem {
    label: ReactNode
    active: boolean
}

export default function DropDownItem({ label, active }: IDropDownItem) {
    return (
        <button
            className={twMerge(
                active ? "text-inherit" : "text-slate-700",
                "relative h-[50px] cursor-pointer bg-white hover:bg-neutral-100 w-full"
            )}
        >
            <div className="mx-4 flex h-full items-center justify-between">
                {label}
                {active && <IconCheck />}
            </div>
        </button>
    )
}
