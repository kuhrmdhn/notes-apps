import { Search } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import React, { useEffect, useRef, useState } from "react";

type Props = {
    onSearch: (keyword: string) => void
    defaultValue?: string
}

export default function SearchBar({ onSearch, defaultValue }: Props) {
    const inputRef = useRef(null)
    const [inputValue, setInputValue] = useState("")
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setInputValue(value)
    }
    const handleSearch = () => {
        onSearch(inputValue)
    }

    useEffect(() => {
        const handleEnter = ({ key }: KeyboardEvent) => {
            if (key == "Enter") {
                handleSearch()
            }
        }
        window.addEventListener("keydown", handleEnter)
        return () => window.removeEventListener("keydown", handleEnter)
    })
    return (
        <div className="flex w-96 h-12">
            <Input
                defaultValue={defaultValue}
                ref={inputRef}
                onChange={handleOnChange}
                className="w-96 h-full placeholder-gray-400 placeholder:text-sm"
                withLabel={false}
                placeholder="search your notes..."
            />
            <Button
                onClick={handleSearch}
                variant={"ghost"}
                className="w-fit h-full text-white hover:text-white/80 bg-red-main hover:bg-red-main/80"
            >
                <Search />
            </Button>
        </div>
    )
}
