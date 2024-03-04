import { twMerge } from "tailwind-merge"

import Logo from "./Logo"
import SearchBar from "./SearchBar"

const headerStyles = {
    container: {
        position: {
            fixed: "fixed bg-white shadow-md",
            absolute: "absolute bg-transparent",
        },
    },
}

type THeaderPosition = "fixed" | "absolute"

interface IHeaderProps {
    position?: THeaderPosition
}

export default function Header({ position = "fixed" }: IHeaderProps) {
    return (
        <header
            className={twMerge(
                headerStyles.container.position[position],
                "flex top-0 left-0 h-[72px] w-full items-center z-10"
            )}
        >
            <nav className="flex-1">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 md:gap-5 justify-between">
                        <Logo />

                        {position === "fixed" && (
                            <div className="flex-1 max-w-[56ch]">
                                <SearchBar size="small" />
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
