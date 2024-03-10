import { Fragment, useRef, useState } from "react"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"

import DropdownButton from "./DropDownButton"
import DropDownMenu from "./DropDownMenu"
import DropDownList from "./DropDownList"

import { isColorMenu } from "./types"
import type { TVariant, TMenuItems } from "./types"
import DropDownColorList from "./DropDownColorList"

interface IQueryFilter<V extends TVariant, T extends string> {
    initialActiveIndex: number
    menuItems: TMenuItems<V, T>
    onSelect: (selectedItem: TMenuItems<V, T>[number]) => void
}

export default function QueryFilter<V extends TVariant, T extends string>({
    initialActiveIndex = 0,
    menuItems,
    onSelect,
}: IQueryFilter<V, T>) {
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
                        <div className="flex items-center">
                            {menuItems[activeIndex].value !== null && (
                                <div
                                    style={{
                                        backgroundColor:
                                            menuItems[activeIndex].color,
                                        border:
                                            menuItems[activeIndex].value ===
                                            "white"
                                                ? "1px solid rgb(209 213 219)"
                                                : "",
                                    }}
                                    className={`w-6 h-6 rounded-full mr-2 bg-[${menuItems[activeIndex].color}}]`}
                                />
                            )}
                            {menuItems[activeIndex].label}
                        </div>
                    </DropdownButton>
                    {isOpen && (
                        <DropDownMenu>
                            <DropDownColorList
                                colorMenuList={menuItems}
                                onItemClick={handleItemClick}
                            />
                        </DropDownMenu>
                    )}
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
        <div ref={dropdownRef} className="relative z-10">
            {renderDropDown()}
        </div>
    )
}
