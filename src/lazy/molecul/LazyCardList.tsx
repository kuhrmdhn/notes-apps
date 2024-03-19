import LazyCard from "../atom/LazyCard"

function LazyCardList() {
    return (
        <section className="h-full w-full grid grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center p-3">
            <LazyCard />
            <LazyCard />
            <LazyCard />
            <LazyCard />
            <LazyCard />
            <LazyCard />
        </section>
    )
}

export default LazyCardList
