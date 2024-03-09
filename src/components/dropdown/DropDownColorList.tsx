import type { IColorMenuItem } from "./types"

interface IDropDownColorList {
    colorMenuList: IColorMenuItem<string | null>[]
    onItemClick: (activeIndex: number) => void
}

export default function DropDownColorList({
    colorMenuList,
    onItemClick,
}: IDropDownColorList) {
    return (
        <div className="p-5 bg-white rounded-md">
            <ul className="grid grid-cols-7 gap-1">
                {colorMenuList.map((menuItem, index) => {
                    const isAll = menuItem.value === null
                    const isWhite = menuItem.value === "white"

                    return (
                        <li key={index} onClick={() => onItemClick(index)}>
                            <div
                                style={{
                                    backgroundColor: menuItem.color,
                                    border:
                                        isWhite || isAll
                                            ? "1px solid rgb(209 213 219)"
                                            : "",
                                }}
                                className={`${
                                    isAll && "slash"
                                } text-slate-300 aspect-square cursor-pointer`}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
