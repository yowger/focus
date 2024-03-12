import { useRef, useState } from "react"
import { IconSearch } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"
import { useLocalStorage } from "@/hooks/useLocalStorage"

import Button from "@/components/buttons/Button"
import DropDownMenu from "@/components/dropdown/DropDownMenu"

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
    const [history, setHistory] = useLocalStorage<string[]>(
        "photo-search-history",
        []
    )

    const handleSearch = () => {
        if (!searchRef.current) return

        const query = searchRef.current.value.trim().toLowerCase()

        setHistory((preHistory) => [...preHistory, query])

        if (query) {
            navigate(`/search/${query}`)
        }
    }

    const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    const handleSearchHistory = (query: string) => {
        navigate(`/search/${query}`)
    }

    const handleClearHistory = () => {
        setHistory([])
    }

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleClickOutside = () => {
        setIsFocused(false)
    }

    useOnClickOutside(searchBarContainerRef, handleClickOutside)

    return (
        <div ref={searchBarContainerRef} className="relative">
            <div
                className={twMerge(
                    isFocused
                        ? "bg-white border-stone-300"
                        : "bg-neutral-100 border-stone-100",
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
                        isFocused
                            ? "bg-white border-l rounded-r-md"
                            : "bg-transparent",
                        searchBarStyles.searchButton.base
                    )}
                >
                    <IconSearch className="m-auto" />
                </button>
            </div>

            {isFocused && history.length > 0 && (
                <DropDownMenu className="p-4 shadow-sm">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <p className="mr-2 font-medium">Recent searches</p>
                            <Button
                                onClick={handleClearHistory}
                                variant="link"
                                className="text-slate-500 hover:text-slate-800 "
                            >
                                clear
                            </Button>
                        </div>

                        <div>
                            <ul className="flex gap-2 flex-wrap">
                                {history.map((query, index) => (
                                    <li key={`$search-query-${index}`}>
                                        <Button
                                            onClick={() =>
                                                handleSearchHistory(query)
                                            }
                                            variant="link"
                                            className="border px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100"
                                        >
                                            {query}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </DropDownMenu>
            )}
        </div>
    )
}
