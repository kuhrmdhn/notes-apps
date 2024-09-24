import React, { useEffect } from "react";

type Props = {
    trigger: boolean
    ref: React.RefObject<HTMLElement>
    callback: () => void
}

export default function useOnClose({ trigger, ref, callback }: Props) {
    useEffect(() => {
        if (!trigger) return
        const onClose = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback()
            }
        }
        document.addEventListener("click", onClose)

        return () => {
            document.removeEventListener("click", onClose)
        }
    }, [ref, callback, trigger])
}
