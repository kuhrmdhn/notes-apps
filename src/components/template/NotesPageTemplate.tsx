import { dialogStore } from '@/store/dialogStore'
import { NoteType } from '@/types/noteType'
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import NoteCard from '../elements/NoteCard'
import NoteDialog from '../elements/NoteDialog'

type Props = {
    displayNotes: NoteType[]
}

export default function NotesPageTemplate({ displayNotes }: Props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const { dialogOpen } = dialogStore(useShallow((state) => ({ dialogOpen: state.dialogOpen })))

    useEffect(() => {
        const handleResizeWindow = () => {
            const width = window.innerWidth
            setWindowWidth(width)
        }
        window.addEventListener("resize", handleResizeWindow)

        return () => window.removeEventListener("resize", handleResizeWindow)
    }, [])

    const noteList = {
        "close": { width: "100%" },
        "open": { width: windowWidth > 480 ? "47%" : "100%", gridTemplateColumns: "repeat(1, minmax(0, 1fr))" }
    }

    return (
        <>
            <motion.div
                variants={noteList}
                animate={dialogOpen ? "open" : "close"}
                initial="close"
                className="h-[100svh] overflow-y-auto border-2 rounded-lg hide-scrollbar py-2">
                <div className={`grid grid-cols-1 lg:grid-cols-3 justify-items-center items-start gap-4 ${dialogOpen && "lg:grid-cols-1" }`}>
                    {
                        displayNotes.map((note: NoteType) => (
                            <NoteCard key={note.id} note={note} />
                        ))
                    }
                </div>
            </motion.div>
            <NoteDialog />
        </>
    )
}
