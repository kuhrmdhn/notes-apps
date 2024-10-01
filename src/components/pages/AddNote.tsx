import { initialNoteData } from "@/constant/initialNoteDialog"
import { maxNoteTitle } from "@/constant/maxNoteTitle"
import useNote from "@/hooks/useNote"
import { NoteType } from "@/types/noteType"
import React, { useRef, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import useDateFormat from "@/hooks/useDateFormat"

export default function AddNote() {
    const formatDate = useDateFormat()
    const checkboxRef = useRef<HTMLButtonElement>(null)
    const [inputTitleLength, setInputTitleLength] = useState(0)
    const [noteData, setNoteData] = useState<NoteType>(initialNoteData)
    const { addNote } = useNote(noteData)
    const { toast } = useToast()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const id = Date.now()
        const createdAt = formatDate(new Date)
        const data = {
            ...noteData,
            id,
            createdAt,
            archived: checkboxRef.current?.getAttribute('aria-checked') === 'true' || false
        }
        addNote(data)
        setNoteData(initialNoteData)
    }
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (name === "title") {
            setInputTitleLength(value.length)
            if (value.length > maxNoteTitle) {
                setInputTitleLength(maxNoteTitle)
                const sliceTitle = value.slice(0, maxNoteTitle)
                setNoteData((state) => ({ ...state, title: sliceTitle }))
                toast({
                    title: "Max length of title",
                    duration: 3000,
                    variant: "destructive"
                })
                return
            }
        }
        setNoteData((state) => ({ ...state, [name]: value }))
    }
    return (
        <section className="w-full h-full flex justify-center items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-7 h-full w-5/6">
                <div className="relative h-fit">
                    <span className="absolute z-10 right-2 bottom-1 text-gray-400 text-xs">{maxNoteTitle - inputTitleLength}/{maxNoteTitle}</span>
                    <Input
                        required
                        onChange={(e) => handleOnChange(e)}
                        type="text"
                        value={noteData.title}
                        name="title"
                        placeholder="Title"
                        withLabel={false}
                        className="placeholder:text-slate-500"
                    />
                </div>
                <Textarea
                    required
                    className="h-1/3 w-full"
                    onChange={(e) => handleOnChange(e)}
                    value={noteData.body}
                    name="body"
                    placeholder="Note"
                />
                <div className="flex gap-3">
                    <Label htmlFor="archived">Set as archive</Label>
                    <Checkbox
                        ref={checkboxRef}
                        id="archived"
                        name="archived"
                        className="data-[state=checked]:bg-red-main"
                    />
                </div>
                <Button className="h-fit w-fit self-end bg-red-main hover:bg-red-main/80" type="submit">Submit</Button>
            </form>
        </section>
    )
}
