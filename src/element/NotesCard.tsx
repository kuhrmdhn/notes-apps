import { IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react"
import { NotesType } from "../utils/type/NotesType"
import { CalendarIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useNotesStore } from "../utils/zustand/NotesStore"
import { useFormStore } from "../utils/zustand/FormStore"

function NotesCard({ id, date, title, description }: NotesType) {
    const toast = useToast()
    const handleEditData = useFormStore(state => state.handleEditData)
    const [notes, setNotes, archive, setArchive, fetchLocalStorage] = useNotesStore(state => [
        state.notes,
        state.setNotes,
        state.archive,
        state.setArchive,
        state.fetchLocalStorage
    ])
    function deleteNotes(): void {
        const index = notes.findIndex(note => note.id === id && note.date === date && note.title === title && note.description === description);
        notes.splice(index, 1)
        setNotes(notes)
        fetchLocalStorage()
        toast({
            title: `Deleted ${title} from Notes!`,
            status: "success",
            isClosable: true,
            duration: 1500,
            position: "top-right"
        })
    }
    function archiveNotes(): void {
        const index = notes.findIndex(note => note.id === id && note.date === date && note.title === title && note.description === description);
        const newArchive = notes.splice(index, 1)
        setArchive([...archive, newArchive].flatMap(e => e))
        setNotes(notes)
        fetchLocalStorage()
        toast({
            title: `Moved ${title} to Archive!`,
            status: "success",
            isClosable: true,
            duration: 1500,
            position: "top-right"
        })
    }

    const menuListData = [
        {
            id: 1,
            text: "Archive",
            icon: <CalendarIcon />,
            color: "blue",
            action: archiveNotes
        },
        {
            id: 2,
            text: "Delete",
            icon: <DeleteIcon />,
            color: "red",
            action: deleteNotes
        },
        {
            id: 3,
            text: "Edit",
            icon: <EditIcon />,
            color: "green",
            action: () => handleEditData({ id, date, title, description })
        }
    ]
    return (
        <section className="w-40 sm:w-60 lg:w-80 h-56 sm:h-64 lg:h-72 bg-light-green py-2 px-3 font-sans text-dark-green">
            <div className="w-full h-1/5 flex justify-between">
                <section className="w-full h-full">
                    <h1 title={title} className="font-extrabold text-sm lg:text-xl h-1/2 overflow-clip">{title}</h1>
                    <p className="text-xs">{date}</p>
                </section>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        icon={<ChevronDownIcon />}
                        aria-label="Options"
                        variant={"outlined"}
                    />
                    <MenuList>
                        {
                            menuListData.map(data => (
                                <MenuItem
                                    key={data.id}
                                    onClick={data.action}
                                    icon={data.icon}
                                    color={data.color}
                                >
                                    {data.text}
                                </MenuItem>
                            ))
                        }
                    </MenuList>
                </Menu>
            </div>
            <div className="w-full h-4/5 card-overflow">
                <p>{description}</p>
            </div>
        </section>
    )
}

export default NotesCard