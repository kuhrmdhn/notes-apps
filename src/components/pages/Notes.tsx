import { NotesStore } from '@/store/notesStore'
import { NoteType } from '@/types/noteType'
import NoteCard from '../elements/NoteCard'
import NoteDialog from '../elements/NoteDialog'
import { motion } from "framer-motion"
import { dialogStore } from '@/store/dialogStore'
import { useShallow } from 'zustand/shallow'

export default function NotesPage() {
    const { dialogOpen } = dialogStore(useShallow((state) => ({ dialogOpen: state.dialogOpen })))
    const { notes } = NotesStore()
    const noteList = {
        "full": { width: "100%" },
        "halfScreen": { width: "50%" }
    }

    return (
        <section className='min-h-[100svh] w-full'>
            <motion.div variants={noteList} animate={dialogOpen ? "halfScreen" : "full"} initial="full" className="flex flex-wrap justify-evenly gap-y-5">
                {
                    notes.map((note: NoteType) => (
                        <NoteCard note={note} />
                    ))
                }
            </motion.div>

            <NoteDialog />
        </section>
    )
}
