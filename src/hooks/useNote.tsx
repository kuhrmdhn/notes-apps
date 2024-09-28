import { NotesStore } from "@/store/notesStore";
import { NoteType } from "@/types/noteType";
import { useShallow } from "zustand/shallow";
import { useToast } from "./use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function useNote(param: NoteType) {
    const { notes, setNotes } = NotesStore(useShallow((state) => ({ notes: state.notes, setNotes: state.setNotes })))
    const { toast } = useToast()
    const addNote = () => {
        const newNotes = [...notes, param]
        setNotes(newNotes)
    }
    const deleteNote = () => {
        const noteIndex = notes.indexOf(param)
        const undoDeleteNote = () => {
            notes.splice(noteIndex, 0, param)
            setNotes(notes)
        }
        notes.splice(noteIndex, 1)
        setNotes(notes)
        toast({
            title: "Deleted note",
            variant: "destructive",
            duration: 3000,
            action: <ToastAction altText="Undo" onClick={undoDeleteNote}>Undo</ToastAction>
        })
    }
    const editNote = () => {
        const notesData = notes.map((note) => note.id === param.id ? param : note)
        setNotes(notesData)
        toast({
            title: "Edited note",
            duration: 3000,
        })
    }

    return { addNote, deleteNote, editNote }
}
