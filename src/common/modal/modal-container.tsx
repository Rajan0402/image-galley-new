import { FullPageImageView } from "../full-page-image-view"
import { ModalOverlay } from "./modal-overlay"

export const ModalContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalOverlay>
        <div className="border-red-500 border overflow-auto">
            {children}
        </div>
    </ModalOverlay>
  )
}
