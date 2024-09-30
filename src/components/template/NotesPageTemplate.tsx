import useWindowWidth from '@/hooks/useWindowWidth'
import { dialogStore } from '@/store/dialogStore'
import { NoteType } from '@/types/noteType'
import { motion } from "framer-motion"
import { useShallow } from 'zustand/shallow'
import NoteCard from '../elements/NoteCard'
import NoteDialog from '../elements/NoteDialog'

type Props = {
    displayNotes: NoteType[]
    className?: string
}

export default function NotesPageTemplate({ displayNotes, className }: Props) {
    const { dialogOpen } = dialogStore(useShallow((state) => ({ dialogOpen: state.dialogOpen })))
    const windowWidth = useWindowWidth()

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
                className="h-full w-full overflow-y-auto border-2 rounded-lg hide-scrollbar py-2">
                {
                    displayNotes.length > 0 ?
                        <div className={`grid justify-items-center gap-4 ${dialogOpen ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 "} ${className}`}>
                            {
                                displayNotes.map((note: NoteType) => (
                                    <NoteCard key={note.id} note={note} />
                                ))
                            }
                        </div>
                        :
                        <EmptyNotes />
                }
            </motion.div>
            <NoteDialog />
        </>
    )
}


function EmptyNotes() {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center gap-5 text-lg font-thin '>
            <img className='w-1/5 aspect-square' src="/image/empty-note.svg" alt="Empty note" />
            <h3>Note is empty</h3>
        </div>
    )
}