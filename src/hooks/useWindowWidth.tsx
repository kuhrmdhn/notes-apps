import { useEffect, useState } from "react"

export default function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResizeWindow = () => {
            const width = window.innerWidth
            setWindowWidth(width)
        }
        window.addEventListener("resize", handleResizeWindow)

        return () => window.removeEventListener("resize", handleResizeWindow)
    }, [])

    return windowWidth
}
