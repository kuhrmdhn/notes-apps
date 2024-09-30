import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom"

export default function GetStarted() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setName(value)
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        localStorage.setItem("name", name)
        navigate("/")
    }
    return (
        <section className="w-full h-screen bg-white flex md:flex-col lg:flex-row md:gap-5 justify-center lg:justify-evenly items-center">
            <div className="w-2/5 h-2/5 lg:h-full hidden opacity-0 md:opacity-100 md:flex justify-center items-center">
                <img className="h-1/2 w-auto aspect-auto" src="/image/welcome-image.svg" alt="Welcome Image" />
            </div>
            <form onSubmit={handleSubmit} className="h-full w-5/6 md:w-1/2 lg:w-2/5 flex flex-col justify-evenly">
                <div>
                    <h1 className="text-xl lg:text-3xl font-semibold">Before we get started, <br /> let's get to know each other!</h1>
                    <p className="text-xs md:text-base">Don't worry, we just need this to make your experience more personal!</p>
                </div>
                <div className="flex flex-col gap-10">
                    <Input
                        required
                        type="text"
                        onChange={(e) => handleOnChange(e)}
                        name={"name input"}
                        value={name}
                        placeholder={"Your Name"}
                        className="border-0 border-b-2 rounded-none focus:ring-0 border-red-main"
                    />
                </div>
                <Button className="w-fit self-end bg-red-main hover:bg-red-main/80 font-semibold text-text-white" type="submit">Let's go!</Button>
            </form>
        </section>
    )
}
