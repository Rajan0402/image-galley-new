"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="absolute w-full h-full top-0 bg-black/50 backdrop-filter backdrop-brightness-75 backdrop-blur-sm flex justify-center items-center"
      onClose={onDismiss}
    >
      {children}
      {/* <button onClick={onDismiss} className="close-button h-10 w-10 border border-red-900" /> */}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
