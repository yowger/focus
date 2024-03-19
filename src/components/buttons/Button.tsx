import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import type { ButtonHTMLAttributes } from "react"

const buttonSizes = {
    small: "small",
    normal: "normal",
    large: "large",
} as const

const buttonVariants = {
    primary: "primary",
    danger: "danger",
    ghost: "ghost",
    ghostInvert: "ghost-invert",
    outline: "outline",
    link: "link",
    white: "white",
} as const

const buttonRoundness = {
    normal: "normal",
    full: "full",
} as const

type TButtonVariant = keyof typeof buttonVariants
type TButtonSize = keyof typeof buttonSizes
type TButtonRoundness = keyof typeof buttonRoundness

type ButtonStyles = {
    base: string
    size: Record<TButtonSize, string>
    roundness: Record<TButtonRoundness, string>
    variant: Record<TButtonVariant, string>
}

const buttonStyles: ButtonStyles = {
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
        white: "bg-white text-gray-500 hover:text-slate-800",
        danger: "bg-red-600 hover:bg-red-700 text-white focus:bg-red-700",
        ghost: "text-slate-600",
        ghostInvert: "text-white hover:text-neutral-500",
        outline:
            "bg-white border border-stone-300 hover:border-stone-500 focus:border-stone-500",
        link: "p-0 p-0 h-min font-normal font-normal",
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
            ...restProps
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
                {...restProps}
            >
                {children}
            </button>
        )
    }
)

export default Button
