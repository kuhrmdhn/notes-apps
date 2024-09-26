import { NotesStore } from "@/store/notesStore";
import { NoteType } from "@/types/noteType";
import { useShallow } from "zustand/shallow";
import { useToast } from "./use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function useNote(note: NoteType) {
    const { notes, setNotes } = NotesStore(useShallow((state) => ({ notes: state.notes, setNotes: state.setNotes })))
    const { toast } = useToast()
    const addNote = () => {
        const newNotes = [...notes, note]
        setNotes(newNotes)
    }
    const deleteNote = () => {
        const noteIndex = notes.indexOf(note)
        const undoDeleteNote = () => {
            notes.splice(noteIndex, 0, note)
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

    return { addNote, deleteNote }
}
