import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { NotesType } from "../utils/type/NotesType"
import { CalendarIcon, ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons"
import { useNotesStore } from "../utils/zustand/NotesStore"

function NotesCard({ id, date, title, description }: NotesType) {
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
    }
    function archiveNotes(): void {
        const index = notes.findIndex(note => note.id === id && note.date === date && note.title === title && note.description === description);
        const newArchive = notes.splice(index, 1)
        setArchive([...archive, newArchive].flatMap(e => e))
        setNotes(notes)
        fetchLocalStorage()
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