import { ModalContainer } from "./modal-container"

export const ModalOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="top-0 right-0 left-0 bottom-0 fixed bg-black/90 flex justify-center items-center">
      {children}
    </div>
  )
}