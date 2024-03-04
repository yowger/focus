import { IconFocusCentered } from "@tabler/icons-react"

export default function Logo() {
    return (
        <span className="flex w-[45px] h-[45px] bg-teal-600 rounded-md cursor-pointer items-center justify-center">
            <IconFocusCentered
                size={25}
                className="text-slate-50"
                strokeWidth={2.3}
            />
        </span>
    )
}
