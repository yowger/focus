import { Fragment, useEffect, useRef } from "react"
import ReactDom from "react-dom"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

import { useEventListener } from "@/hooks/useEventListener"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"
import { useScrollLock } from "@/hooks/useScrollLock"
import { useScrollbarWidth } from "@/hooks/useScrollbarWidth"

import PhotoDetails from "@/features/photos/components/PhotoDetails"
import Button from "../buttons/Button"
import ModalOverlay from "./ModalOverlay"

import type { IPhotoWithLiked } from "@/features/photos/types/photoTypes"

interface IModalProps {
    isOpen: boolean
    photo: IPhotoWithLiked | null
    hasNext?: boolean
    hasPrev?: boolean
    onClose: () => void
    onLikeCLick: (photo: IPhotoWithLiked) => void
    onDownloadImage: (imageUrl: string, imageName: string) => void
    onLeftClick: () => void
    onRightClick: () => void
}

export default function PhotoModal({
    isOpen,
    photo,
    hasNext = false,
    hasPrev = false,
    onClose,
    onLikeCLick,
    onDownloadImage,
    onLeftClick,
    onRightClick,
}: IModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    const { lock, unlock } = useScrollLock({
        autoLock: false,
    })
    const scrollBarWidth = useScrollbarWidth()

    const handleClose = () => {
        unlock()
        onClose()
    }

    const handleClickOutside = () => {
        handleClose()
    }

    const handleEscapePress = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
            handleClose()
        }
    }

    useEventListener("keydown", handleEscapePress)
    useOnClickOutside(modalRef, handleClickOutside)

    useEffect(() => {
        if (isOpen) {
            lock()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    if (!isOpen || !photo) return null

    return ReactDom.createPortal(
        <Fragment>
            <ModalOverlay>
                <div className="w-[78%] absolute" ref={modalRef}>
                    <div className="relative bg-white rounded-lg px-5 py-4 mt-7">
                        <PhotoDetails
                            photo={photo}
                            onLikeCLick={onLikeCLick}
                            onDownloadImage={onDownloadImage}
                        />
                        {hasPrev && (
                            <Button
                                onClick={onLeftClick}
                                className="fixed top-[40%] left-[10px]"
                                variant="ghost-invert"
                                size="large"
                            >
                                <IconChevronLeft size={42} />
                            </Button>
                        )}
                        {hasNext && (
                            <Button
                                onClick={onRightClick}
                                className="fixed top-[40%] right-0"
                                style={{
                                    right: `calc(10px + ${scrollBarWidth}px)`,
                                }}
                                variant="ghost-invert"
                                size="large"
                            >
                                <IconChevronRight size={42} />
                            </Button>
                        )}
                    </div>
                </div>
            </ModalOverlay>
        </Fragment>,
        document.getElementById("portal")!
    )
}
