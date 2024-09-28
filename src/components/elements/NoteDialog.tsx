import useArchive from "@/hooks/useArchive"
import useNote from "@/hooks/useNote"
import { dialogStore } from "@/store/dialogStore"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useShallow } from "zustand/shallow"
import { Button, ButtonProps } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

type ButtonPropsType = {
    title: string
    variant: ButtonProps["variant"]
    onClick: () => void
    option?: string
};

export default function NoteDialog() {
    const { dialogNote, dialogOpen, setDialogOpen } = dialogStore(useShallow((state) => ({
        dialogNote: state.dialogNote,
        dialogOpen: state.dialogOpen,
        setDialogOpen: state.setDialogOpen
    })))
    const [editNoteOption, setEditNoteOption] = useState({ data: dialogNote, isEdit: false })
    useEffect(() => {
        setEditNoteOption((state) => ({ ...state, data: dialogNote }))
    }, [dialogNote])
    const { toggleArchiveNote } = useArchive(editNoteOption.data)
    const { editNote } = useNote(editNoteOption.data)
    const handleEditNote = () => {
        editNote()
        setEditNoteOption((state) => ({...state, isEdit: false}))
    }
    const tableData = [
        {
            title: "Title",
            name: "title",
            value: editNoteOption.data?.title,
            optionalStyle: `font-bold ${editNoteOption.isEdit && "border-slate-800"}`
        },
        {
            title: "Status",
            value: editNoteOption.data?.archived ? "Archived" : "Active",
        },
        {
            title: "Create on",
            value: editNoteOption.data?.createdAt,
        }
    ]
    const buttonData: ButtonPropsType[] = [
        {
            title: editNoteOption.isEdit ? "Cancel" : "Edit",
            variant: "outline",
            onClick: () => setEditNoteOption((state) => ({ ...state, isEdit: !state.isEdit }))
        },
        {
            title: editNoteOption.isEdit ? "Save" : `Set as ${editNoteOption.data.archived ? "Active" : "Archive"} Note`,
            variant: "default",
            onClick: editNoteOption.isEdit ? handleEditNote : toggleArchiveNote,
            option: "bg-red-main hover:bg-red-main/90"
        },
    ]
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (editNoteOption) {
            const { value, name } = e.target
            setEditNoteOption((state) => state && ({ ...state, data: { ...state.data, [name]: value } }))
        }
    }
    return (
        <motion.section className='h-[100svh] w-full lg:w-[40svw] bg-white fixed top-0 px-3 border-2 rounded-xl' variants={dialog} initial="close" animate={dialogOpen ? "open" : "close"}>
            <Button variant={"ghost"} className="absolute right-2 top-2 hover:bg-transparent" onClick={() => setDialogOpen(false)}>
                <X />
            </Button>
            <div className="h-full w-full pt-5 flex flex-col gap-5">
                <table className="w-full h-1/6">
                    <tbody className="w-full">
                        {
                            tableData.map((table, index) => (
                                <tr key={index} className="flex gap-3 items-center">
                                    <td className="w-1/6">{table.title}</td>
                                    <td className={`flex items-center before:content-[':'] before:mr-2 before:font-normal ${table.optionalStyle}`}>
                                        <Input
                                            name={table.name}
                                            value={table.value}
                                            onChange={(e) => handleOnChange(e)}
                                            readOnly={editNoteOption.isEdit ? false : true}
                                            className={`border border-transparent ${table.optionalStyle}`}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <hr />
                <Textarea
                    className={`${editNoteOption.isEdit ? "border-slate-800" : "border-transparent"} text-justify disabled:text-black disabled:cursor-auto px-2 py-3 overflow-auto min-h-[60%] w-full`}
                    onChange={(e) => handleOnChange(e)}
                    name="body"
                    defaultValue={editNoteOption.data?.body}
                    disabled={!editNoteOption.isEdit}
                />
                <div className="flex items-center justify-end gap-3 h-16 w-full">
                    {
                        buttonData.map((button, index) => (
                            <Button
                                variant={button.variant}
                                className={`min-w-20 h-fit ${button.option}`}
                                onClick={button.onClick}
                                key={index}
                            >
                                {button.title}
                            </Button>
                        ))
                    }
                </div>
            </div>
        </motion.section >
    )
}



const dialog = {
    "open": { right: "10px" },
    "close": { right: "-100%" },
}