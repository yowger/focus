import { colorItems, orientationItems, sizeItems } from "../data/PhotoFilters"

import DropDown from "@/components/dropdown/DropDown"

import type { IMenuItem } from "@/components/dropdown/types"
import type {
    TPhotoColors,
    TPhotoOrientations,
    TPhotoSizes,
} from "../types/photoTypes"

interface IFilterProps {
    onSelectOrientation: (item: IMenuItem<TPhotoOrientations | null>) => void
    onSelectSize: (item: IMenuItem<TPhotoSizes | null>) => void
    onSelectColor: (item: IMenuItem<TPhotoColors | null>) => void
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
