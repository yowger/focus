import { Fragment, useRef, useState } from "react"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"

import DropdownButton from "./DropDownButton"
import DropDownMenu from "./DropDownMenu"
import DropDownList from "./DropDownList"

import { isColorMenu } from "./types"
import type { TVariant, menuItems } from "./types"

interface IDropDownProps<V extends TVariant, T extends string> {
    initialActiveIndex: number
    menuItems: menuItems<V, T>
    onSelect: (selectedItem: menuItems<V, T>[number]) => void
}

export default function DropDown<V extends TVariant, T extends string>({
    initialActiveIndex = 0,
    menuItems,
    onSelect,
}: IDropDownProps<V, T>) {
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

    const renderDropDown = () => {
        if (menuItems.length === 0) return

        if (isColorMenu(menuItems)) {
            return (
                <Fragment>
                    <DropdownButton onClick={handleOpenState} isOpen={isOpen}>
                        <div
                            className={`w-4 h-4 bg-[${menuItems[activeIndex].color}}]`}
                        />
                        {menuItems[activeIndex].label}
                    </DropdownButton>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
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
                </Fragment>
            )
        }
    }

    return (
        <div ref={dropdownRef} className="relative z-50">
            {renderDropDown()}
        </div>
    )
}
