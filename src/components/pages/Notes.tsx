import { NotesStore } from '@/store/notesStore'
import { NoteType } from '@/types/noteType'
import { useShallow } from 'zustand/shallow'
import NoteCard from '../elements/NoteCard'

export default function NotesPage() {
    const { notes } = NotesStore(useShallow((state) => ({ notes: state.notes })))
    return (
        <div className='grid grid-cols-3 gap-y-3 justify-items-center'>
            {
                notes.map((note:NoteType, index:number) => (
                    <NoteCard note={note} key={index} />
                ))
            }
        </div>
    )
}
