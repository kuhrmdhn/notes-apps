import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom"

export default function GetStarted() {
    const navigate = useNavigate()
    const [inputForm, setInputForm] = useState({
        name: "",
        nickname: ""
    })
    const inputData = [
        {
            name: "name",
            value: inputForm.name,
            id: "nameInput",
            placeholder: "Your full name"
        },
        {
            name: "nickname",
            value: inputForm.nickname,
            id: "nicknameInput",
            placeholder: "How we'll refer to you?"
        }
    ]
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setInputForm((state) => ({ ...state, [name]: value }))
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { name, nickname } = inputForm
        console.log({name})
        console.log({nickname})
        localStorage.setItem("name", name)
        localStorage.setItem("nickname", nickname)
        navigate("/")
    }
    return (
        <section className="w-full h-[100svh] flex md:flex-col lg:flex-row md:gap-5 lg:justify-evenly items-center">
            <div className="w-2/5 h-2/5 lg:h-full hidden opacity-0 md:opacity-100 md:flex justify-center items-center">
                <img className="h-1/2 w-auto aspect-auto" src="/image/welcome-image.svg" alt="Welcome Image" />
            </div>
            <form onSubmit={handleSubmit} className="h-1/2 lg:h-full w-5/6 md:w-1/2 lg:w-2/5 flex flex-col justify-evenly">
                <div>
                    <h1 className="text-xl lg:text-3xl font-semibold">Before we get started, <br /> let's get to know each other!</h1>
                    <p className="text-xs md:text-base">Don't worry, we just need this to make your experience more personal!</p>
                </div>
                <div className="flex flex-col gap-10">
                    {
                        inputData.map((input, index: number) => (
                            <Input
                                key={index}
                                required
                                type="text"
                                onChange={(e) => handleOnChange(e)}
                                name={input.name}
                                value={input.value}
                                id={input.id}
                                placeholder={input.placeholder}
                                className="border-0 border-b-2 rounded-none focus:ring-0 border-red-main"
                            />
                        ))
                    }
                </div>
                <Button className="w-fit self-end bg-red-main hover:bg-red-main/80 font-semibold text-text-white" type="submit">Let's go!</Button>
            </form>
        </section>
    )
}