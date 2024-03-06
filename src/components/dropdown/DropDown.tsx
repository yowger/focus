import { useRef, useState } from "react"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"

import DropdownButton from "./DropDownButton"
import DropDownMenu from "./DropDownMenu"
import DropDownList from "./DropDownList"

import type { IMenuItem } from "./types"

interface IDropDown<T extends string | null> {
    menuItems: IMenuItem<T>[]
    initialActiveIndex: number
    onSelect: (item: IMenuItem<T>) => void
}

export default function DropDown<T extends string | null>({
    menuItems,
    initialActiveIndex = 0,
    onSelect,
}: IDropDown<T>) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleItemClick = (activeIndex: number) => {
        setActiveIndex(activeIndex)

        onSelect(menuItems[activeIndex])

        setIsOpen(false)
    }

    const handleOpenState = () => {
        setIsOpen((prev) => !prev)
    }

    const handleClickOutside = () => {
        setIsOpen(false)
    }

    useOnClickOutside(dropdownRef, handleClickOutside)

    return (
        <div ref={dropdownRef} className="relative z-50">
            <DropdownButton onClick={handleOpenState} isOpen={isOpen}>
                {menuItems[activeIndex].label}
            </DropdownButton>
            {isOpen && (
                <DropDownMenu>
                    <DropDownList
                        menuItems={menuItems}
                        activeIndex={activeIndex}
                        onItemClick={handleItemClick}
                    />
                </DropDownMenu>
            )}
        </div>
    )
}
