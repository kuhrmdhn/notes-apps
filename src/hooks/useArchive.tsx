import { NotesStore } from "@/store/notesStore"
import { NoteType } from "@/types/noteType"
import { useShallow } from "zustand/shallow"
import { useToast } from "./use-toast"

export default function useArchive(note: NoteType) {
    const { toast } = useToast()
    const { notes, setNotes } = NotesStore(useShallow((state) => ({ notes: state.notes, setNotes: state.setNotes })))
    const archive = () => {
        const newNotes = notes.map((n: NoteType) =>
            note.id === n.id ? { ...n, archived: true } : n
        )
        toast({
            title: "Add to archive note",
            duration: 3000,

        })
        setNotes(newNotes)
    }
    const unarchive = () => {
        const newNotes = notes.map((n: NoteType) =>
            note.id === n.id ? { ...n, archived: false } : n
        )
        toast({
            title: "Add to active note",
            duration: 3000,

        })
        setNotes(newNotes)
    }
    return { archive, unarchive }
}
