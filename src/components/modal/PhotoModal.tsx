import { Fragment, useEffect, useRef } from "react"
import ReactDom from "react-dom"

import { useEventListener } from "@/hooks/useEventListener"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"
import { useScrollLock } from "@/hooks/useScrollLock"

import ModalOverlay from "./ModalOverlay"

import type { IPhoto } from "@/features/photos/types/photoTypes"
import PhotoDetails from "@/features/photos/components/PhotoDetails"

interface IModalProps {
    isOpen: boolean
    photo: IPhoto | null
    onClose: () => void
}

export default function PhotoModal({ isOpen, onClose, photo }: IModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    const { lock, unlock } = useScrollLock({
        autoLock: false,
    })

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
    }, [isOpen])

    if (!isOpen || !photo) return null

    return ReactDom.createPortal(
        <Fragment>
            <ModalOverlay>
                <div
                    ref={modalRef}
                    className="w-[78%] absolute bg-white rounded-lg px-5 py-4 mt-7"
                >
                    <PhotoDetails photo={photo} />
                </div>
            </ModalOverlay>
        </Fragment>,
        document.getElementById("portal")!
    )
}
