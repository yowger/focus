import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import type { ButtonHTMLAttributes } from "react"

type TButtonVariant = "primary" | "danger" | "ghost" | "outline" | "ghost-invert" | "link"
type TButtonSize = "small" | "normal" | "large"
type TButtonRoundness = "normal" | "full"

const buttonStyles = {
    base: "text-slate-800 focus:outline-none transition ease-in-out duration-300 font-medium overflow-hidden flex gap-2.5 items-center whitespace-nowrap",
    size: {
        small: "px-3 h-[36.6px] text-sm",
        normal: "px-4 h-[43.4px] text-base",
        large: "px-4 h-[50px] text-lg",
    },
    roundness: {
        normal: "rounded",
        full: "rounded-full",
    },
    variant: {
        primary: "bg-teal-600 hover:bg-teal-700 text-white focus:bg-teal-700",
        danger: "bg-red-600 hover:bg-red-700 text-white focus:bg-red-700",
        ghost: "text-slate-600",
        "ghost-invert": "text-white hover:text-neutral-500",
        outline:
            "border border-stone-300 hover:border-stone-500 focus:border-stone-500",
        link: "p-0 p-0 h-min font-normal font-normal"
    },
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: TButtonVariant
    size?: TButtonSize
    roundness?: TButtonRoundness
    children?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
    (
        {
            variant = "ghost",
            size = "normal",
            roundness = "normal",
            className,
            children,
            ...otherProps
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={twMerge(
                    buttonStyles.base,
                    buttonStyles.size[size],
                    buttonStyles.roundness[roundness],
                    buttonStyles.variant[variant],
                    className
                )}
                {...otherProps}
            >
                {children}
            </button>
        )
    }
)

export default Button
