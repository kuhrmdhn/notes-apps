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
        "open": { width: windowWidth > 480 ? "47%" : "100%" }
    }

    return (
        <>
            <motion.div
                variants={noteList}
                animate={dialogOpen ? "open" : "close"}
                initial="close"
                className="flex flex-wrap justify-evenly gap-y-5 overflow-y-auto h-[100svh] border-2 rounded-lg hide-scrollbar py-2">
                {
                    displayNotes.map((note: NoteType) => (
                        <NoteCard key={note.id} note={note} />
                    ))
                }
            </motion.div>
            <NoteDialog />
        </>
    )
}
