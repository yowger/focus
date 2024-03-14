import ButtonListItem from "./ButtonListItem"

import type { IButtonListItem } from "./types"

interface IButtonDropdownListProps {
    buttonItemList: IButtonListItem[]
}

export default function ButtonDropdownList({
    buttonItemList,
}: IButtonDropdownListProps) {
    return (
        <ul className="py-1.5 text-slate-800 duration-150">
            {buttonItemList.map((buttonItem, index) => {
                return (
                    <li
                        className={buttonItem.break ? "border-t" : ""}
                        key={"button-item-" + index + "-dropdown"}
                    >
                        <ButtonListItem onClick={buttonItem.function}>
                            {buttonItem.label}
                        </ButtonListItem>
                    </li>
                )
            })}
        </ul>
    )
}
