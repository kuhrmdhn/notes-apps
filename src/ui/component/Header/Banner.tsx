function Banner() {
    const date = new Date
    const hours = date.getHours()
    const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const isDate = `${day[date.getDay()]}, ${month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
    let time;
    switch (true) {
        case hours < 12:
            time = "Morning"
            break;
        case hours < 18:
            time = "Afternoon"
            break;
        default:
            time = "Evening"
            break;
    }

    return (
        <picture className="h-1/5 lg:h-1/3 w-full relative">
            <div className="absolute top-1/3 left-12 lg:left-5 text-beige">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Good {time}</h1>
                <p className="text-xs lg:text-sm">{isDate}</p>
            </div>
            <img className="bg-cover bg-top h-1/5 lg:h-1/3 w-full aspect-auto" src="/images/banner.webp" alt="Banner" loading="lazy" />
        </picture>
    )
}

export default Banner