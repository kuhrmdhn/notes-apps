import { NotesStore } from '@/store/notesStore'
import { NoteType } from '@/types/noteType'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NotesPageTemplate from '../template/NotesPageTemplate'

export default function NotesPage() {
    const [displayNote, setDisplayNote] = useState<NoteType[] | []>([])
    const { activeNotes, archiveNotes } = NotesStore()
    const { noteStatus } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (noteStatus == "active") {
            setDisplayNote(activeNotes)
        } else if (noteStatus == "archive") {
            setDisplayNote(archiveNotes)
        } else {
            navigate("/")
        }
    }, [activeNotes, archiveNotes, navigate, noteStatus])

    return <NotesPageTemplate displayNotes={displayNote} />
}
