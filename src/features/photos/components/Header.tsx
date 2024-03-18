import { Link } from "react-router-dom"
import { IconHeartFilled } from "@tabler/icons-react"
import { twMerge } from "tailwind-merge"

import Button from "@/components/buttons/Button"
import Logo from "./Logo"
import SearchBar from "./SearchBar"

const headerStyles = {
    container: {
        position: {
            fixed: "fixed bg-white",
            absolute: "absolute bg-transparent",
        },
    },
}

export type THeaderPosition = "fixed" | "absolute"

interface IHeaderProps {
    position?: THeaderPosition
    SearchBarStyle?: string
    likedButtonStyle?: string
}

export default function Header({
    position = "fixed",
    SearchBarStyle,
    likedButtonStyle,
}: IHeaderProps) {
    return (
        <header
            className={twMerge(
                headerStyles.container.position[position],
                "flex top-0 left-0 h-[72px] w-full items-center z-50 duration-150"
            )}
        >
            <nav className="flex-1">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 md:gap-5 justify-between">
                        <div>
                            <Link to="/">
                                <Logo />
                            </Link>
                        </div>

                        <div className="flex-1 max-w-[62ch] flex gap-3">
                            <div
                                className={twMerge(
                                    SearchBarStyle && SearchBarStyle,
                                    "flex-1 w-full"
                                )}
                            >
                                <SearchBar size="small" />
                            </div>

                            <Link to="/likes">
                                <Button
                                    variant="outline"
                                    className={twMerge(
                                        likedButtonStyle,
                                        "hover:text-red-500 text-slate-500"
                                    )}
                                >
                                    <IconHeartFilled size="24" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
