import type { ReactNode } from "react"

interface IModalOverLayProps {
    children: ReactNode
}

export default function ModalOverlay({ children }: IModalOverLayProps) {
    return (
        <div className="z-[60] fixed top-0 left-0 w-full h-full bg-neutral-900/95 flex justify-center overflow-y-auto">
            {children}
        </div>
    )
}
