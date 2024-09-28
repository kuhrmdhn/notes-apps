import { initialNoteDialog } from "@/constant/initialNoteDialog"
import { NoteType } from "@/types/noteType"
import { create } from "zustand"

type Dialog = {
    dialogOpen: boolean
    dialogNote: NoteType
    setDialogNote: (param: NoteType) => void
    setDialogOpen: (state: boolean) => void
}

export const dialogStore = create<Dialog>()((set) => ({
    dialogOpen: false,
    dialogNote: initialNoteDialog,
    setDialogNote: (dialogNote) => {
            set({ dialogNote })
    },
    setDialogOpen: (state) => {
        set({ dialogOpen: state })
    }
}))