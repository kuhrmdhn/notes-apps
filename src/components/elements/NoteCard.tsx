import { OptionType } from "@/types/optionType";
import Option from "../ui/option";
import { NoteType } from "@/types/noteType";
import Ring from "../ui/ring";
import useArchive from "@/hooks/useArchive";
import useNote from "@/hooks/useNote";
import { dialogStore } from "@/store/dialogStore";
import { useShallow } from "zustand/shallow";

type Props = {
    note: NoteType
}

export default function NoteCard({ note }: Props) {
    const { title, body, createdAt, archived } = note
    const { toggleArchiveNote } = useArchive(note)
    const { deleteNote } = useNote(note)
    const { setDialogNote, setDialogOpen } = dialogStore(useShallow((state) => ({
        setDialogNote: state.setDialogNote,
        setDialogOpen: state.setDialogOpen
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
    const openDialogTrigger = () => {
        setDialogOpen(true)
        setDialogNote(note)
    }
    return (
        <section className="w-[400px] h-40 p-4 border border-gray-400 rounded-md bg-white flex">
            <span className="h-fit w-8">
                <Ring color={archived ? "#05a301" : "#0225FF"} />
            </span>
            <div className="h-full w-full flex flex-col justify-between">
                <section className="h-1/5 w-full font-bold text-lg">
                    <h1 onClick={openDialogTrigger} className="w-fit cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap underline-offset-2 hover:underline">{title}</h1>
                </section>
                <section className="h-full w-full overflow-hidden text-sm text-justify text-gray-500">
                    <p className="line-clamp-3">{body}</p>
                </section>
                <section className="h-1/5 w-full text-2xs text-end">
                    <h2>Create on: {createdAt}</h2>
                </section>
            </div>
            <span className="h-fit w-5">
                <Option optionList={options} />
            </span>
        </section>
    )
}

