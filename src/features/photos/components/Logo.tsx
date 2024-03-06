import { IconFocusCentered } from "@tabler/icons-react"

export default function Logo() {
    return (
        <span className="flex w-[45px] h-[45px] bg-teal-600 hover:bg-teal-700 active:bg-teal-500 rounded-md cursor-pointer items-center justify-center duration-300">
            <IconFocusCentered
                size={25}
                className="text-slate-50"
                strokeWidth={2.3}
            />
        </span>
    )
}

// useImageOnLoad for blur effects
// https://usehooks-ts.com/react-hook/use-image-on-load
