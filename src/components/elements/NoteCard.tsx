import { OptionType } from "@/types/optionType";
import Option from "../ui/option";
import { NoteType } from "@/types/noteType";
import Ring from "../ui/ring";

type Props = {
    note: NoteType
}

export default function NoteCard({ note }: Props) {
    const { title, body, createdAt, archived } = note
    return (
        <section className="w-[400px] h-40 p-4 border border-gray-400 rounded-md bg-white flex">
            <span className="h-fit w-8">
                <Ring color={archived ? "#05a301" : "#0225FF"} />
            </span>
            <div className="h-full w-full flex flex-col justify-between">
                <section className="h-1/5 w-full font-bold text-lg">
                    <h1 className="w-fit text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer underline-offset-2 hover:underline">{title}</h1>
                </section>
                <section className="h-full w-full overflow-hidden text-sm text-justify text-gray-500">
                    <p className="line-clamp-3">{body}</p>
                </section>
                <section className="h-1/5 w-full text-2xs text-end">
                    <h2>Create on: {createdAt}</h2>
                </section>
            </div>
            <span className="h-fit w-8">
                <Option optionList={options} />
            </span>
        </section>
    )
}

const options: OptionType[] = [
    {
        text: "Archive",
        onClick: () => alert("archive")
    },
    {
        text: "Delete",
        onClick: () => alert("delete")
    }
]
