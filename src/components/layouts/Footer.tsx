import type { ComponentProps } from "react"
import {
    IconBrandGithub,
    IconBrandSkype,
    IconFocusCentered,
    IconCode,
} from "@tabler/icons-react"
import { twMerge } from "tailwind-merge"

import MainContainer from "../containers/MainContainer"

interface IFooterProps {
    className?: ComponentProps<"div">["className"]
}

export default function PageContainer({ className }: IFooterProps) {
    return (
        <footer
            className={twMerge("py-7 bg-neutral-900 text-white", className)}
        >
            <MainContainer>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-normal tracking-wider flex items-center mb-2 gap-1">
                            <IconFocusCentered size={34} />
                        </h2>

                        <p className="max-w-[56ch] text-center text-lg">
                            Focus is a personal project created by Roger Pantil
                            and is not intended for commercial use or business
                            purposes.
                        </p>
                    </div>

                    <div>
                        <a
                            href="https://github.com/yowger/focus"
                            target="_blank"
                            className="flex gap-2 hover:text-slate-300 duration-150"
                        >
                            <IconCode /> Source code
                        </a>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/yowger"
                                target="_blank"
                                className="flex gap-2 hover:text-slate-300 duration-150"
                            >
                                <IconBrandGithub /> Github
                            </a>
                            <a
                                href="https://join.skype.com/invite/xTRyQtrZHA2P"
                                target="_blank"
                                className="flex gap-2 hover:text-slate-300 duration-150"
                            >
                                <IconBrandSkype /> Skype
                            </a>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </footer>
    )
}
