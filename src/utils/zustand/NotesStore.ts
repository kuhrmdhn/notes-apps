import { create } from "zustand";
import { NotesType } from "../type/NotesType";

interface NotesState {
    notes: NotesType[],
    archive: NotesType[],
    setNotes: (notes: NotesType[]) => void,
    setArchive: (archive: NotesType[]) => void
    fetchLocalStorage: () => void
}

export const getNotes = localStorage.getItem("notes")
export const getArchive = localStorage.getItem("archive")

export const useNotesStore = create<NotesState>()((set) => ({
    notes: getNotes ? JSON.parse(getNotes) : [],
    archive: getArchive ? JSON.parse(getArchive) : [],
    setNotes: (notes) => {
        const newNotesData = JSON.stringify(notes)
        localStorage.setItem("notes", newNotesData)
        set({ notes })
    },
    setArchive: (archive) => {
        const newArchiveData = JSON.stringify(archive)
        localStorage.setItem("archive", newArchiveData)
        set({ archive })
    },
    fetchLocalStorage: async () => {
        const notesString = localStorage.getItem("notes");
        const archiveString = localStorage.getItem("archive");
        const notes = notesString ? JSON.parse(notesString) : [];
        const archive = archiveString ? JSON.parse(archiveString) : [];
        set({ notes, archive });
    }
}))