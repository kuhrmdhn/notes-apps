import { ReactNode, Suspense } from "react"
import LazyCardList from "../molecul/LazyCardList"

interface LazyNoteProps {
    children: ReactNode;
}

function LazyNote({ children }: LazyNoteProps) {
    return (
        <>
            <Suspense fallback={<LazyCardList />}>
                {children}
            </Suspense>
        </>
    )
}

export default LazyNote
