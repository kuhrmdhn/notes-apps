import { create } from "zustand";
import { NoteType } from "../types/noteType"
import { initialNotes } from "@/constant/initialNotes";

type NoteStore = {
    notes: NoteType[],
    setNotes: (param: NoteType[]) => void
}

const savedNotes = localStorage.getItem("notes")
const notes = savedNotes ? JSON.parse(savedNotes) : initialNotes

export const NotesStore = create<NoteStore>()((set) => ({
    notes: notes,
    setNotes(notes: NoteType[]) {
        set({ notes })
        localStorage.setItem("notes", JSON.stringify(notes))
    },
}))