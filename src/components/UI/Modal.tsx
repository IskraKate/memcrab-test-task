import { useRef, type ReactNode } from "react"
import { useEffect } from "react"
import { createPortal } from "react-dom"

type ModalProps = {
  children: ReactNode
  open: boolean
  className?: string
}

const Modal = ({ children, open, className = "" }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    const modal = dialogRef.current

    if (!modal) return

    if (open) {
      modal.showModal()
    }

    return () => modal.close()
  }, [open])

  const modalRoot = document.getElementById("modal")
  if (!modalRoot) return null

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`}>
      {children}
    </dialog>,
    modalRoot
  )
}

export default Modal
