import ButtonListItem from "./ButtonListItem"

import type { TButtonItem } from "./types"

interface IButtonDropdownListProps {
    buttonItemList: TButtonItem[]
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
