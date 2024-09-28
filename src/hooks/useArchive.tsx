import { NotesStore } from "@/store/notesStore"
import { NoteType } from "@/types/noteType"
import { useShallow } from "zustand/shallow"
import { useToast } from "./use-toast"
import { dialogStore } from "@/store/dialogStore"

export default function useArchive(note: NoteType) {
    const { toast } = useToast()
    const { setArchiveNotes, setActiveNotes } = NotesStore(
        useShallow((state) => ({
            setArchiveNotes: state.setArchiveNotes,
            setActiveNotes: state.setActiveNotes,
        }))
    )
    const { setDialogOpen } = dialogStore(
        useShallow((state) => ({
            setDialogOpen: state.setDialogOpen
        }))
    )

    const closeDialog = () => setDialogOpen(false)

    const archive = () => {
        setArchiveNotes(note)
        toast({
            title: "Added to archive",
            duration: 3000,
        })
        closeDialog()
    }

    const unarchive = () => {
        setActiveNotes(note)
        toast({
            title: "Moved to active notes",
            duration: 3000,
        })
        closeDialog()
    }

    const toggleArchiveNote = () => {
        if (note.archived) {
            unarchive()
        } else {
            archive()
        }
        closeDialog()
    }

    return { archive, unarchive, toggleArchiveNote }
}
