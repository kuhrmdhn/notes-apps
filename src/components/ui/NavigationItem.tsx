import { motion } from "framer-motion";
import React, { HTMLProps } from "react";
import { Link } from "react-router-dom";

type Props = {
    isActive: boolean;
    text: string;
    icon?: React.ReactNode
    url: string
} & HTMLProps<HTMLAnchorElement>

export default function NavigationItem({ isActive, text, icon, url,...props }: Props) {
    const background = {
        active: {
            width: "130%",
            height: "100%",
        },
        default: {
            width: "0",
            height: "0",
        },
    };

    return (
        <Link to={url}
            relative="path"
            className={`relative top-0 z-10 bg-transparent w-full h-14 flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-4 ${isActive ? "text-red-main" : "text-white"}`}
            {...props}
        >
            <span className="w-6">
            {icon}
            </span>
            <span className="w-20 md:w-28 lg:w-24 text-center text-xs sm:text-base">
                {text}
            </span>
            <motion.span
                className="absolute -z-10 right-1/2 -top-1/3 lg:top-0 translate-y-1/3 lg:translate-y-0 translate-x-1/2 bg-white rounded-lg"
                variants={background}
                initial="default"
                animate={isActive ? "active" : "default"}
            />
        </Link>
    );
}
