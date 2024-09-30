import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import NotesPageTemplate from '../template/NotesPageTemplate'
import { initialNotes } from '@/constant/initialNotes'
import { NotesStore } from '@/store/notesStore'
import { useShallow } from 'zustand/shallow'

export default function Search() {
    const [searchParams] = useSearchParams()
    const { notes } = NotesStore((useShallow((state) => ({ notes: state.notes }))))
    const [noteDisplay, setNoteDisplay] = useState(initialNotes)
    useEffect(() => {
        const keyword = searchParams.get("keyword")
        if(!keyword) {
            setNoteDisplay([])
        }
        if (keyword) {
            const key = keyword.trim().toLowerCase()
            const filteredNotes = notes.filter((note) => note.title.trim().toLowerCase().includes(key))
            setNoteDisplay(filteredNotes)
        }
    }, [searchParams, notes])

    return (
        <NotesPageTemplate displayNotes={noteDisplay} />
    )
}
