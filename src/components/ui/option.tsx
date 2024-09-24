import useOnClose from "@/hooks/useOnClose"
import { OptionType } from "@/types/optionType"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useRef, useState } from "react"

type Props = {
    optionList: OptionType[]
}

export default function Option({ optionList }: Props) {
    const optionRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const icon = { "open": { rotate: 180 }, "close": { rotate: 0 } }
    const options = { "open": { opacity: 1, top: 0 }, "close": { opacity: 0, top: -100 } }
    const optionClick = () => setIsOpen((state) => !state)
    useOnClose({ trigger: isOpen, ref: optionRef, callback: () => setIsOpen(false) })

    return (
        <div ref={optionRef} className="flex flex-col items-end">
            <motion.div
                className="w-fit h-fit cursor-pointer"
                onClick={optionClick}
                initial="close"
                variants={icon}
                animate={isOpen ? "open" : "close"}
            >
                <ChevronDown />
            </motion.div>
            <motion.ul
                className="bg-white min-w-40 min-h-20 flex flex-col justify-evenly relative border rounded-md"
                variants={options}
                animate={isOpen ? "open" : "close"}
                initial="close"
            >
                {
                    optionList.map((option: OptionType, index: number) => (
                        <li
                            className="flex items-center cursor-pointer px-2 hover:bg-gray-100 h-7"
                            key={index}
                            onClick={option.onClick}
                        >
                            {option.text}
                        </li>
                    ))
                }
            </motion.ul>
        </div>
    )
}
