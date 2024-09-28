import { create } from "zustand"
import { NoteType } from "../types/noteType"
import { initialNotes } from "@/constant/initialNotes"

type NoteStore = {
    notes: NoteType[]
    archiveNotes: NoteType[]
    activeNotes: NoteType[]
    setNotes: (param: NoteType[]) => void
    setArchiveNotes: (param: NoteType) => void
    setActiveNotes: (param: NoteType) => void
    refreshNotes: () => void
}

function getInitialNotes() {
    const savedNotes = localStorage.getItem("notes")
    return savedNotes ? JSON.parse(savedNotes) : initialNotes
}

export const NotesStore = create<NoteStore>()((set, get) => ({
    notes: getInitialNotes(),
    activeNotes: getInitialNotes().filter((note: NoteType) => !note.archived),
    archiveNotes: getInitialNotes().filter((note: NoteType) => note.archived),
    setNotes(notes: NoteType[]) {
        set({ notes })
        localStorage.setItem("notes", JSON.stringify(notes))
        get().refreshNotes()
    },
    setActiveNotes(note: NoteType) {
        const activeNotes = get().notes.map((n) => n.id === note.id ? { ...n, archived: false } : n)
        get().setNotes(activeNotes)
    },
    setArchiveNotes(note: NoteType) {
        const archiveNotes = get().notes.map((n) => n.id === note.id ? { ...n, archived: true } : n)
        get().setNotes(archiveNotes)
    },
    refreshNotes() {
        const { notes } = get()
        set({ activeNotes: notes.filter((note) => !note.archived) })
        set({ archiveNotes: notes.filter((note) => note.archived) })
    }
}))
