type Props = {
    imageSource?: string
}
export default function ProfileCard({ imageSource = "/image/default-profile.svg" }: Props) {
    const [name, photoProfile] = [localStorage.getItem("name"), localStorage.getItem("photo-profile")]

    return (
        <section className="w-full h-1/4 flex flex-col items-center gap-3">
            <img
                className="h-24 w-24 rounded-full border-2 border-gray-200 bg-white"
                src={photoProfile || imageSource}
                alt="Photo profile"
            />
            <h4 className="font-bold text-sm">{name}</h4>
        </section>
    )
}
