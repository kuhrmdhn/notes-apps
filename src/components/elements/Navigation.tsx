import { LayoutList, ListChecks, LayoutDashboard, User } from "lucide-react";
import NavigationItem from "../ui/NavigationItem";
import { useLocation } from "react-router-dom";
import ProfileCard from "../ui/ProfileCard";

export default function Navigation() {
    const {pathname} = useLocation()
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
    return (
        <nav className="h-16 lg:h-[100%] w-full lg:w-1/5 fixed lg:relative bottom-0 mt-auto mr-5 pt-[7%] bg-red-main flex flex-col gap-3 lg:rounded-e-lg shadow-md shadow-gray-200 text-white">
            <ProfileCard/>
            <ul className="w-full h-full flex lg:flex-col justify-evenly lg:justify-start lg:gap-3 items-end lg:items-center">
                {
                    navigationItems.map((item, index) => (
                        <li key={index}>
                            <NavigationItem
                                url={item.href}
                                isActive={pathname == item.href}
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
