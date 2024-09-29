export default function ProfileCard() {
    const [name, photoProfile] = [localStorage.getItem("name"), localStorage.getItem("photo-profile")]

    return (
        <section className="w-full h-1/4 absolute -top-12 right-1/2 translate-x-1/2 hidden lg:flex flex-col items-center gap-3">
            <img
                className="h-24 w-24 rounded-full border-2 border-gray-200 bg-white"
                src={photoProfile || "/image/default-profile.svg"}
                alt="Photo profile"
            />
            <h4 className="font-bold text-sm">{name}</h4>
        </section>
    )
}
