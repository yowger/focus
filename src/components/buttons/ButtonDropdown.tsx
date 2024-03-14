import { useRef, useState } from "react"
import { IconChevronDown } from "@tabler/icons-react"
import { twMerge } from "tailwind-merge"

import Button from "@/components/buttons/Button"
import ButtonDropdownList from "./ButtonDropdownList"
import DropDownMenu from "../dropdown/DropDownMenu"

import type { ReactNode } from "react"
import type { IButtonListItem } from "./types"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"

interface IButtonDropdownProps {
    buttonLabel: ReactNode
    buttonItemList: IButtonListItem[]
    buttonFunction?: () => void
}

export default function ButtonDropdown({
    buttonLabel,
    buttonItemList,
    buttonFunction,
}: IButtonDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const buttonDropDownRef = useRef<HTMLDivElement>(null)

    const handleButtonMenuState = () => {
        setIsOpen((prev) => !prev)
    }

    const handleClickOutside = () => {
        setIsOpen(false)
    }

    useOnClickOutside(buttonDropDownRef, handleClickOutside)

    return (
        <div ref={buttonDropDownRef} className="relative">
            <div className="flex">
                <Button
                    onClick={buttonFunction}
                    className="rounded-r-none"
                    variant="primary"
                    size="normal"
                >
                    {buttonLabel}
                </Button>
                <Button
                    onClick={handleButtonMenuState}
                    className="rounded-l-none px-2.5 border-l"
                    variant="primary"
                    size="normal"
                >
                    <span
                        className={twMerge(
                            isOpen
                                ? "animate-flip-icon-up"
                                : "animate-flip-icon-down"
                        )}
                    >
                        <IconChevronDown size={21} />
                    </span>
                </Button>
            </div>
            {isOpen && (
                <DropDownMenu className="shadow-md">
                    <ButtonDropdownList buttonItemList={buttonItemList} />
                </DropDownMenu>
            )}
        </div>
    )
}
