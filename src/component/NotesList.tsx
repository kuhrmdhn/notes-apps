import EmptyNote from "../element/EmptyNote"
import NotesCard from "../element/NotesCard"
import { useNotesStore } from "../utils/zustand/NotesStore"
import { useSearchStore } from "../utils/zustand/SearchStore"

function NotesList() {
    document.title = "Notes"
    const notes = useNotesStore(state => state.notes)
    const search = useSearchStore(state => state.search)
    let notesDisplay = notes
    if (search !== "") {
        notesDisplay = notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()))
    }
    return (
        <>
            {
                notesDisplay.length === 0 ?
                    <EmptyNote /> :
                    <section className="h-4/5 sm:h-5/6 lg:h-2/3 w-full grid grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center p-3 card-overflow">
                        {
                            notesDisplay.map((data, index) => (
                                <NotesCard
                                    key={index}
                                    id={data.id}
                                    date={data.date}
                                    title={data.title}
                                    description={data.description}
                                />
                            ))
                        }
                    </section>
            }
        </>
    )
}

export default NotesList
