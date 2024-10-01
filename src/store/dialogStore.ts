import { initialNoteData } from "@/constant/initialNoteDialog"
import { NoteType } from "@/types/noteType"
import { create } from "zustand"

type Dialog = {
    dialogOpen: boolean
    dialogNote: NoteType
    setDialogNote: (param: NoteType) => void
    setDialogOpen: (state: boolean) => void
    closeDialog: () => void
    openDialog: (param: NoteType) => void
}

export const dialogStore = create<Dialog>()((set) => ({
    dialogOpen: false,
    dialogNote: initialNoteData,
    setDialogNote: (dialogNote) => {
        set({ dialogNote })
    },
    setDialogOpen: (state) => {
        set({ dialogOpen: state })
    },
    closeDialog: () => {
        set({ dialogOpen: false, dialogNote: initialNoteData })
    },
    openDialog: (note: NoteType) => {
        set({ dialogOpen: true, dialogNote: note })
    }
}))