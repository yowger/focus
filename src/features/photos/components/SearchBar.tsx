import { useRef, useState } from "react"
import { IconSearch } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"

import type { KeyboardEvent } from "react"

const searchBarStyles = {
    container: {
        base: "relative w-full rounded-md flex border duration-300",
        size: {
            small: "h-[45px]",
            medium: "h-[50px]",
        },
    },
    input: {
        base: "py-3 px-4 outline-none tracking-wide text-neutral-500 duration-150 h-full rounded-bl-md rounded-tl-md placeholder:text-neutral-700/60",
        size: {
            small: "w-[calc(100%-48px)] text-[17.5px]",
            medium: "w-[calc(100%-53px)] text-lg",
        },
    },
    searchButton: {
        base: "flex absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 active:text-slate-900 duration-150 h-full w-[50px] rounded-br-md rounded-bt-md",
    },
}

type TSearchBarSize = "small" | "medium"

interface ISearchBarProps {
    size?: TSearchBarSize
}

export default function SearchBar({ size = "medium" }: ISearchBarProps) {
    const [isFocused, setIsFocused] = useState(false)
    const searchRef = useRef<HTMLInputElement>(null)
    const searchBarContainerRef = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()

    const handleSearch = () => {
        if (!searchRef.current) return

        const query = searchRef.current.value.trim().toLowerCase()

        if (query) {
            navigate(`/search/${query}`)
        }
    }

    const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleClickOutside = () => {
        setIsFocused(false)
    }

    useOnClickOutside(searchBarContainerRef, handleClickOutside)

    return (
        <div
            ref={searchBarContainerRef}
            className={twMerge(
                isFocused ? "bg-white" : "bg-neutral-100 border-neutral-100",
                searchBarStyles.container.size[size],
                searchBarStyles.container.base
            )}
            onFocus={handleFocus}
        >
            <input
                ref={searchRef}
                onKeyDown={handleEnter}
                type="search"
                placeholder="Search for photos"
                className={twMerge(
                    isFocused ? "bg-white" : "bg-transparent",
                    searchBarStyles.input.size[size],
                    searchBarStyles.input.base
                )}
            />
            <button
                type="submit"
                onClick={handleSearch}
                className={twMerge(
                    isFocused ? "bg-white border-l" : "bg-transparent",
                    searchBarStyles.searchButton.base
                )}
            >
                <IconSearch className="m-auto" />
            </button>
        </div>
    )
}
