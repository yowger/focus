import DropDownItem from "./DropDownItem"
import type { IMenuItem } from "./types"

interface IDropDownList {
    menuItems: IMenuItem<string | null>[]
    activeIndex: number
    onItemClick?: (activeIndex: number) => void
}

export default function DropDownList({
    menuItems,
    activeIndex,
    onItemClick,
}: IDropDownList) {
    const handleItemClick = (activeIndex: number) => {
        if (onItemClick) onItemClick(activeIndex)
    }

    return (
        <ul className="divide-y overflow-hidden rounded-md text-lg font-medium">
            {menuItems.map((menuItem, index) => {
                return (
                    <li key={index} onClick={() => handleItemClick(index)}>
                        <DropDownItem
                            label={menuItem.label}
                            active={index === activeIndex}
                        />
                    </li>
                )
            })}
        </ul>
    )
}
