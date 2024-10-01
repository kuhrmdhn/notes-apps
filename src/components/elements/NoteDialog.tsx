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
import useWindowWidth from "@/hooks/useWindowWidth"

type ButtonPropsType = {
    title: string
    variant: ButtonProps["variant"]
    onClick: () => void
    option?: string
};

export default function NoteDialog() {
    const windowWidth = useWindowWidth()
    const { dialogNote, dialogOpen, closeDialog } = dialogStore(useShallow((state) => ({
        dialogNote: state.dialogNote,
        dialogOpen: state.dialogOpen,
        closeDialog: state.closeDialog
    })))
    const [editNoteOption, setEditNoteOption] = useState({ data: dialogNote, isEdit: false })
    const { toggleArchiveNote } = useArchive(editNoteOption.data)
    const { editNote } = useNote(editNoteOption.data)
    const handleEditNote = () => {
        editNote()
        setEditNoteOption((state) => ({ ...state, isEdit: false }))
    }
    useEffect(() => {
        setEditNoteOption((state) => ({ ...state, data: dialogNote }))
    }, [dialogNote])
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
            onClick: () => setEditNoteOption((state) => ({ data: dialogNote, isEdit: !state.isEdit }))
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

    const dialog = {
        "open": { right: windowWidth > 768 ? "16px" : "0" },
        "close": { right: "-100%" },
    }

    return (
        <motion.section className='h-full lg:h-[80svh] w-full flex justify-center items-center lg:w-[40svw] bg-white fixed z-20 bottom-0 px-3 border-2 rounded-xl' variants={dialog} initial="close" animate={dialogOpen ? "open" : "close"}>
            <Button variant={"ghost"} className="absolute right-2 top-2 hover:bg-transparent" onClick={closeDialog}>
                <X />
            </Button>
            <div className="h-full w-full sm:w-4/5 pt-5 flex flex-col justify-around">
                <table className="w-full h-1/6">
                    <tbody className="w-full">
                        {
                            tableData.map((table, index) => (
                                <tr key={index} className="flex gap-3 items-center">
                                    <td className="w-1/4 sm:w-1/6 text-sm">{table.title}</td>
                                    <td className={`flex items-center before:content-[':'] before:mr-2 before:font-normal ${table.optionalStyle}`}>
                                        <Input
                                            name={table.name}
                                            value={table.value}
                                            onChange={(e) => handleOnChange(e)}
                                            readOnly={editNoteOption.isEdit ? false : true}
                                            className={`text-sm border border-transparent ${table.optionalStyle}`}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <hr />
                <Textarea
                    className={`${editNoteOption.isEdit ? "border-slate-800" : "border-transparent"} text-justify disabled:text-black disabled:cursor-auto px-2 py-3 overflow-auto min-h-[50%] w-full`}
                    onChange={(e) => handleOnChange(e)}
                    name="body"
                    value={editNoteOption.data?.body}
                    disabled={!editNoteOption.isEdit}
                />
                <div className="flex items-end justify-end gap-3 h-16 w-full">
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