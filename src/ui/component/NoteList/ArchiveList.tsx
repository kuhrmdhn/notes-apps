import ArchiveCard from "../../element/ArchiveCard"
import EmptyNote from "../../element/EmptyNote"
import { useNotesStore } from "../../../utils/zustand/NotesStore"
import { useSearchStore } from "../../../utils/zustand/SearchStore"

function ArchiveList() {
    document.title = "Archive"
    const archive = useNotesStore(state => state.archive)
    const search = useSearchStore(state => state.search)
    let archiveDisplay = archive
    if (search !== "") {
        archiveDisplay = archive.filter(archived => archived.title.toLowerCase().includes(search.toLowerCase()))
    }
    return (
        <>
            {
                archiveDisplay.length === 0 ?
                    <EmptyNote /> :
                    <section className="h-4/5 sm:h-5/6 lg:h-2/3 w-full grid grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center p-3 card-overflow">
                        {
                            archiveDisplay.map((data, index) => (
                                <ArchiveCard
                                    key={index}
                                    id={data.id}
                                    title={data.title}
                                    date={data.date}
                                    description={data.description}
                                />
                            ))
                        }
                    </section>
            }
        </>
    )
}

export default ArchiveList
