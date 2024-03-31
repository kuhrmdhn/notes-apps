import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react"
import { useFormStore } from "../utils/zustand/FormStore"
import { EditIcon } from "@chakra-ui/icons"
import React, { useEffect, useState } from "react"
import { useNotesStore } from "../utils/zustand/NotesStore"
import { NotesType } from "../utils/type/NotesType"

function EditNotesForm() {
    const [isOpenEditForm, onCloseEditForm] = useFormStore(state => [state.isOpenEditForm, state.onCloseEditForm])
    const editedData = useFormStore(state => state.editedData)
    const [formData, setFormData] = useState(editedData)
    const [notes, setNotes, archive, setArchive] = useNotesStore(state => [state.notes, state.setNotes, state.archive, state.setArchive])
    useEffect(() => {
        setFormData(editedData);
    }, [editedData]);

    const inputData = [
        {
            id: 1,
            type: "text",
            name: "title",
            placeholder: "Title",
            value: formData.title
        },
        {
            id: 2,
            type: "date",
            name: "date",
            value: formData.date
        }
    ]

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const name = e.target.name
        const value = e.target.value
        setFormData((initialValue) => ({
            ...initialValue, [name] : value
        }))
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let index;
        const findNotesIdx = notes.findIndex(note => note.id === formData.id);
        const newData: NotesType = {
            id: formData.id,
            date: formData.date,
            title: formData.title,
            description: formData.description
        }
        if(findNotesIdx !== -1) {
            index = findNotesIdx
            notes[index] = newData
            setNotes([...notes])
        } else {
            index = archive.findIndex(note => note.id === formData.id);
            archive[index] = newData 
            setArchive([...archive])
        }
        onCloseEditForm()
    }

    return (
        <section className="fixed bottom-5 right-5">
            <Drawer
                isOpen={isOpenEditForm}
                onClose={onCloseEditForm}
                size={"sm"}
                placement="right"
            >
                <DrawerContent background={"#F8F6E9"}>
                    <DrawerCloseButton />
                    <DrawerHeader className='flex gap-3 items-center mt-5 sm:mt-0'>
                        <EditIcon />
                        <p className='font-bold'>Edit Note</p>
                    </DrawerHeader>
                    <form className="h-full w-full flex flex-col justify-center mt-3" onSubmit={(e) => handleSubmit(e)}>
                        <DrawerBody height={"90%"} width={"100%"} >
                            <DrawerBody height={"90%"} width={"100%"} >
                                {
                                    inputData.map((data) => (
                                        <FormControl key={data.id}>
                                            <FormLabel>
                                                {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                                            </FormLabel>
                                            <Input
                                                type={data.type}
                                                name={data.name}
                                                placeholder={data.placeholder}
                                                value={data.value}
                                                onChange={(e) => handleOnChange(e)}
                                                size="lg"
                                                background={"#F2EDD3"}
                                            />
                                        </FormControl>
                                    ))
                                }
                                <FormControl height={"47%"}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        value={formData.description}
                                        name='description'
                                        onChange={(e) => handleOnChange(e)}
                                        className='card-overflow'
                                        background={"#F2EDD3"}
                                        height={"100%"}
                                        resize={"none"}
                                        placeholder='Description'
                                    />
                                </FormControl>
                            </DrawerBody>
                            <DrawerFooter height={"15%"} width={"100%"} display={"flex"} justifyContent={"center"}>
                                <Button type='submit' className='w-5/6' fontSize={"18px"} height={"100%"} borderRadius={"14px"} _hover={{ background: "#F25003" }} background={"#F25003"} color={"#F2EDD3"}>
                                    Save
                                </Button>
                            </DrawerFooter>
                        </DrawerBody>
                    </form>
                </DrawerContent>
            </Drawer>
        </section>
    )
}

export default EditNotesForm
