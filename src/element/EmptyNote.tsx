function EmptyNote() {
    return (
        <section className="h-2/3 w-full flex flex-col justify-center items-center gap-7">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-dark-green">Oops!</h1>
                <p className="text-md">We didn't Find Anything</p>
            </div>
            <img className="w-1/6 aspect-square" src="/images/not-found-notes.svg" alt="Not Found Notes Image" />
        </section>
    )
}

export default EmptyNote