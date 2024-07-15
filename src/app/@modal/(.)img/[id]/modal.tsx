"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

function CancelSVG() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
}

export function Modal({ children}: { children: React.ReactNode}) {
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
      <div className="w-[80vw]">
        <div className="flex justify-end pb-1">
          <button onClick={onDismiss} className="xl:"><CancelSVG/></button>
        </div>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
