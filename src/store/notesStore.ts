import { create } from "zustand";
import { NoteType } from "../types/noteType"
import { initialNotes } from "@/constant/initialNotes";

type NoteStore = {
    notes: NoteType[],
    setNote: (param: NoteType[]) => void
}

const initialLocalStorage = JSON.stringify(initialNotes)
localStorage.setItem("notes", initialLocalStorage)
const notes = localStorage.getItem("notes")

export const NotesStore = create<NoteStore>()((set) => ({
    notes: notes && JSON.parse(notes),
    setNote(notes: NoteType[]) {
        set({ notes })
    },
}))