import { create } from "zustand";
import { NotesType } from "../type/NotesType";

interface FormState {
    isOpenEditForm: boolean
    onOpenEditForm: () => void
    onCloseEditForm: () => void
    editedData: NotesType
    setEditedData: (param: NotesType) => void
    handleEditData: (param: NotesType) => void
}

export const useFormStore = create<FormState>()((set) => ({
    isOpenEditForm: false,
    onOpenEditForm: () => set({ isOpenEditForm: true }),
    onCloseEditForm: () => set({
        isOpenEditForm: false, editedData: { id: 0, date: "", title: "", description: "" }
    }),
    editedData: {
        id: 0,
        date: "",
        title: "",
        description: ""
    },
    setEditedData: (editedData) => set({ editedData }),
    handleEditData: (data: NotesType) => {
        set({isOpenEditForm: true, editedData: data})
        
    }
}))