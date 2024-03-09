import { colorItems, orientationItems, sizeItems } from "../data/PhotoFilters"

import DropDown from "@/components/dropdown/DropDown"

import type { IColorMenuItem, IMenuItem } from "@/components/dropdown/types"
import {
    TPhotoColors,
    TPhotoOrientations,
    TPhotoSizes,
} from "../types/photoTypes"

interface IFilterProps {
    onSelectOrientation: (data: IMenuItem<TPhotoOrientations | null>) => void
    onSelectSize: (data: IMenuItem<TPhotoSizes | null>) => void
    onSelectColor: (data: IColorMenuItem<TPhotoColors | null>) => void
}

export default function Filter({
    onSelectOrientation,
    onSelectSize,
    onSelectColor,
}: IFilterProps) {
    return (
        <section>
            <div className="grid grid-cols-3 gap-5">
                <DropDown<"default", TPhotoOrientations>
                    menuItems={orientationItems}
                    initialActiveIndex={0}
                    onSelect={onSelectOrientation}
                />

                <DropDown<"default", TPhotoSizes>
                    menuItems={sizeItems}
                    initialActiveIndex={0}
                    onSelect={onSelectSize}
                />

                <DropDown<"color", TPhotoColors>
                    menuItems={colorItems}
                    initialActiveIndex={0}
                    onSelect={onSelectColor}
                />
            </div>
        </section>
    )
}
