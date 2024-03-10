import { colorItems, orientationItems, sizeItems } from "../data/PhotoFilters"

import QueryFilter from "@/components/dropdown/QueryFilter"

import type { IColorMenuItem, IMenuItem } from "@/components/dropdown/types"
import {
    TPhotoColors,
    TPhotoOrientations,
    TPhotoSizes,
} from "../types/photoTypes"

interface IFilterSectionProps {
    onSelectOrientation: (data: IMenuItem<TPhotoOrientations | null>) => void
    onSelectSize: (data: IMenuItem<TPhotoSizes | null>) => void
    onSelectColor: (data: IColorMenuItem<TPhotoColors | null>) => void
}

export default function Filter({
    onSelectOrientation,
    onSelectSize,
    onSelectColor,
}: IFilterSectionProps) {
    return (
        <section>
            <div className="grid grid-cols-3 gap-5">
                <QueryFilter<"default", TPhotoOrientations>
                    menuItems={orientationItems}
                    initialActiveIndex={0}
                    onSelect={onSelectOrientation}
                />

                <QueryFilter<"default", TPhotoSizes>
                    menuItems={sizeItems}
                    initialActiveIndex={0}
                    onSelect={onSelectSize}
                />

                <QueryFilter<"color", TPhotoColors>
                    menuItems={colorItems}
                    initialActiveIndex={0}
                    onSelect={onSelectColor}
                />
            </div>
        </section>
    )
}
