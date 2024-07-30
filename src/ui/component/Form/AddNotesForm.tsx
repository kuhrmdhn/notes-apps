import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Input,
    Button,
    useDisclosure,
    IconButton,
    Textarea,
    FormControl,
    FormLabel,
    DrawerCloseButton,
    useToast,
    Checkbox,
} from '@chakra-ui/react'
import { AddIcon, EditIcon } from "@chakra-ui/icons"
import React, { useRef, useState } from 'react'
import { useNotesStore } from '../../../utils/zustand/NotesStore'

function AddNotesForm() {
    const toast = useToast()
    const archiveChecked = useRef<HTMLInputElement>(null)
    const { notes, setNotes, archive, setArchive, fetchLocalStorage } = useNotesStore()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [formData, setFormData] = useState({
        date: new Date().toISOString().slice(0, 10),
        title: "",
        description: ""
    })
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
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void {
        const name = e.target.name
        const value = e.target.value
        setFormData((initialValue) => ({
            ...initialValue, [name]: value
        }))
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        let title = formData.title
        let archiveCheckedStatus;
        if (archiveChecked.current) {
            archiveCheckedStatus = archiveChecked.current.checked
        }
        if (title === "") {
            title = `Note ${formData.date}`
        }
        if (archiveCheckedStatus) {
            archive.push({ id: Date.now(), ...formData, title })
            setArchive(archive)
        } else {
            notes.push({ id: Date.now(), ...formData, title })
            setNotes(notes)
        }
        fetchLocalStorage()
        toast({
            title: `${archiveCheckedStatus ? "Archive" : "Note"} Added!`,
            status: "success",
            isClosable: true,
            duration: 1500,
            position: "top-right"
        })

        setFormData({
            date: new Date().toISOString().slice(0, 10),
            title: "",
            description: ""
        })
    }
    return (
        <section className='fixed bottom-5 right-5'>
            <IconButton aria-label='Add New Notes' colorScheme='teal' onClick={onOpen}>
                <AddIcon />
            </IconButton>
            <Drawer
                isOpen={isOpen}
                size={"sm"}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent background={"#F8F6E9"} className='text-dark-green'>
                    <DrawerCloseButton />
                    <DrawerHeader className='flex gap-3 items-center mt-5 sm:mt-0'>
                        <EditIcon />
                        <p className='font-bold'>New Note</p>
                    </DrawerHeader>
                    <form className="h-full w-full flex flex-col justify-center mt-3" onSubmit={(e) => handleSubmit(e)}>
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
                                            size="lg"
                                            background={"#F2EDD3"}
                                            onChange={(e) => handleOnChange(e)}
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
                                <Checkbox ref={archiveChecked} className='font-semibold mt-4'>Set as Archive Note</Checkbox>
                            </FormControl>
                        </DrawerBody>
                        <DrawerFooter height={"15%"} width={"100%"} display={"flex"} justifyContent={"center"}>
                            <Button type='submit' className='w-5/6' fontSize={"18px"} height={"100%"} borderRadius={"14px"} _hover={{ background: "#F25003" }} background={"#F25003"} color={"#F2EDD3"}>
                                Save
                            </Button>
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </section>
    )
}
export default AddNotesForm