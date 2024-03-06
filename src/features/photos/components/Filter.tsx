import DropDown from "@/components/dropdown/DropDown"

import type { IMenuItem } from "@/components/dropdown/types"

const orientationItems: IMenuItem[] = [
    { label: "All orientations", value: null },
    { label: "landscape", value: "landscape" },
    { label: "portrait", value: "portrait" },
    { label: "square", value: "square" },
]

const sizeItems: IMenuItem[] = [
    { label: "All Sizes", value: null },
    { label: "small", value: "small" },
    { label: "medium", value: "medium" },
    { label: "large", value: "large" },
]

const colorItems: IMenuItem[] = [
    { label: "All Colors", value: null },
    { label: "red", value: "red" },
    { label: "orange", value: "orange" },
    { label: "yellow", value: "yellow" },
    { label: "green", value: "green" },
    { label: "turquoise", value: "turquoise" },
    { label: "blue", value: "blue" },
    { label: "violet", value: "violet" },
    { label: "pink", value: "pink" },
    { label: "brown", value: "brown" },
    { label: "black", value: "black" },
    { label: "gray", value: "gray" },
    { label: "white", value: "white" },
]

interface IFilterProps {
    onSelectOrientation: (item: IMenuItem) => void
    onSelectSize: (item: IMenuItem) => void
    onSelectColor: (item: IMenuItem) => void
}

export default function Filter({
    onSelectOrientation,
    onSelectSize,
    onSelectColor,
}: IFilterProps) {
    return (
        <section>
            <div className="grid grid-cols-3 gap-5">
                <DropDown
                    menuItems={orientationItems}
                    initialActiveIndex={0}
                    onSelect={onSelectOrientation}
                />

                <DropDown
                    menuItems={sizeItems}
                    initialActiveIndex={0}
                    onSelect={onSelectSize}
                />

                <DropDown
                    menuItems={colorItems}
                    initialActiveIndex={0}
                    onSelect={onSelectColor}
                />
            </div>
        </section>
    )
}
