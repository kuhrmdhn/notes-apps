import { OptionType } from "@/types/optionType";
import Option from "../ui/option";
import { NoteType } from "@/types/noteType";
import Ring from "../ui/ring";
import useArchive from "@/hooks/useArchive";
import useNote from "@/hooks/useNote";
import { dialogStore } from "@/store/dialogStore";
import { useShallow } from "zustand/shallow";
import { useEffect, useState } from "react";

type Props = {
    note: NoteType
}

export default function NoteCard({ note }: Props) {
    const [isFocus, setIsFocus] = useState(false)
    const { title, body, createdAt, archived } = note
    const { toggleArchiveNote } = useArchive(note)
    const { deleteNote } = useNote(note)
    const { dialogNote, openDialog } = dialogStore(useShallow((state) => ({
        dialogNote: state.dialogNote,
        openDialog: state.openDialog
    })))
    const options: OptionType[] = [
        {
            text: archived ? "Unarchive" : "Archive",
            onClick: toggleArchiveNote
        },
        {
            text: "Delete",
            onClick: deleteNote
        }
    ]
    useEffect(() => {
        if (note.id == dialogNote.id) {
            setIsFocus(true)
        } else {
            setIsFocus(false)
        }
    }, [note, dialogNote])

    return (
        <section className={`w-[320px] h-32 flex p-4 border border-gray-400 rounded-md ${isFocus ? "bg-gray-100" : "bg-white"}`}>
            <span className="h-full w-1/5">
                <Ring color={archived ? "#05a301" : isFocus ? "#f21e1e" : "#0225FF"} />
            </span>
            <div className="h-full max-w-[80%] flex flex-col justify-between">
                <section className="h-1/3 w-full font-bold text-sm sm:text-base lg:text-lg">
                    <h1 onClick={() => openDialog(note)} className="w-full cursor-pointer line-clamp-1 underline-offset-2 hover:underline">{title}</h1>
                </section>
                <section className="h-full w-full overflow-hidden text-xs sm:text-sm text-justify text-gray-500">
                    <p className="line-clamp-3 sm:line-clamp-2">{body}</p>
                </section>
                <section className="h-1/5 w-full text-2xs text-end">
                    <h2>Create on: {createdAt}</h2>
                </section>
            </div>
            <span className="h-full w-1/5">
                <Option optionList={options} />
            </span>
        </section>
    )
}

