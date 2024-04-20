import { IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react"
import { NotesType } from "../utils/type/NotesType"
import { ChevronDownIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useNotesStore } from "../utils/zustand/NotesStore"
import { useFormStore } from "../utils/zustand/FormStore"

function ArchiveCard({ id, date, title, description }: NotesType) {
    const toast = useToast()
    const handleEditData = useFormStore(state => state.handleEditData)
    const [notes, setNotes, archive, setArchive, fetchLocalStorage] = useNotesStore(state => [
        state.notes,
        state.setNotes,
        state.archive,
        state.setArchive,
        state.fetchLocalStorage
    ])

    function unarchive(): void {
        const index = archive.findIndex(archived => archived.id === id && archived.date === date && archived.title === title && archived.description === description);
        const unarchiveNote = archive.splice(index, 1)
        setNotes([...notes, unarchiveNote].flatMap(e => e))
        setArchive(archive)
        fetchLocalStorage()
        toast({
            title: `Moved ${title} to Notes!`,
            status: "success",
            isClosable: true,
            duration: 1500,
            position: "top-right"
        })
    }
    function deleteArchive(): void {
        const index = archive.findIndex(archived => archived.id === id && archived.date === date && archived.title === title && archived.description === description);
        archive.splice(index, 1)
        setArchive(archive)
        fetchLocalStorage()
        toast({
            title: `Deleted ${title} from Archive!`,
            status: "success",
            isClosable: true,
            duration: 1500,
            position: "top-right"
        })
    }

    const menuListData = [
        {
            id: 1,
            icon: <CloseIcon />,
            text: "Unarchive",
            color: "green",
            action: unarchive
        },
        {
            id: 2,
            icon: <DeleteIcon />,
            text: "Delete",
            color: "red",
            action: deleteArchive
        },
        {
            id: 3,
            text: "Edit",
            icon: <EditIcon />,
            color: "blue",
            action: () => handleEditData({ id, date, title, description })
        }
    ]

    return (
        <section className="w-40 sm:w-60 lg:w-80 h-56 sm:h-64 lg:h-72 bg-blue-300 py-2 px-3 font-sans text-gray-900">
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

export default ArchiveCard
