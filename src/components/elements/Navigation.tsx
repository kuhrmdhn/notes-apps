import { LayoutList, ListChecks, LayoutDashboard, User } from "lucide-react";
import NavigationItem from "../ui/NavigationItem";

export default function Navigation() {
    const navigationItems = [
        {
            text: "Profile",
            href: "/profile",
            icon: <User />
        },
        {
            text: "Dashboard",
            href: "/",
            icon: <LayoutDashboard />
        },
        {
            text: "Active Note",
            href: "/note/active",
            icon: <LayoutList />
        },
        {
            text: "Archive Note",
            href: "/note/archive",
            icon: <ListChecks />
        },
    ];
    const { pathname } = window.location
    const name = localStorage.getItem("name")
    return (
        <nav className="h-16 lg:h-[85svh] w-full lg:w-1/5 fixed lg:relative bottom-0 mt-auto mr-5 pt-[7%] bg-red-main flex flex-col gap-3 lg:rounded-e-lg shadow-md shadow-gray-200 text-white">
            <section className="w-full h-1/4 absolute -top-12 right-1/2 translate-x-1/2 hidden lg:flex flex-col items-center gap-3">
                <img
                    className="h-24 w-24 rounded-full border-2 border-gray-200"
                    src="https://i.pinimg.com/564x/cd/87/84/cd8784afcad04617fed8e7ed37cde762.jpg"
                    alt="Photo profile"
                />
                <h4 className="font-bold text-sm">{name}</h4>
            </section>
            <ul className="w-full h-full flex lg:flex-col justify-evenly lg:justify-start lg:gap-3 items-end lg:items-center">
                {
                    navigationItems.map((item, index) => (
                        <li key={index}>
                            <NavigationItem
                                href={item.href}
                                isActive={pathname === item.href}
                                text={item.text}
                                icon={item.icon}
                            />
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}
