import React, { useEffect, useState } from "react"
import { Input } from "../ui/input"
import ProfileCard from "../ui/ProfileCard"
import { Button } from "../ui/button"

export default function Profile() {
    const [inputValue, setInputValue] = useState({
        name: "",
        image: ""
    })
    useEffect(() => {
        const photoProfile = localStorage.getItem("photo-profile") || "/image/default-profile.svg"
        const name = localStorage.getItem("name")
        if (photoProfile && name) {
            setInputValue(() => ({ name, image: photoProfile }))
        }
    }, [])
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInputValue((state) => ({ ...state, [name]: value }))
    }
    const handleSubmit = () => {
        localStorage.setItem("name", inputValue.name)
        localStorage.setItem("photo-profile", inputValue.image)
    }
    const inputData = [
        {
            type: "text",
            name: "image",
            value: inputValue.image,
            placeholder: "Image Url"
        },
        {
            type: "text",
            name: "name",
            value: inputValue.name,
            placeholder: "Name"
        }
    ]
    return (
        <section className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-5/6 sm:w-1/2 h-full flex flex-col gap-7">
                <ProfileCard imageSource={inputValue.image} />
                {
                    inputData.map((input, index) => (
                        <Input
                            key={index}
                            name={input.name}
                            type={input.type}
                            placeholder={input.placeholder}
                            value={input.value}
                            onChange={handleOnChange}
                        />
                    ))
                }
                <Button type="submit" className="bg-red-main hover:bg-red-main/80 w-fit self-end">Save</Button>
            </form>
        </section>
    )
}
