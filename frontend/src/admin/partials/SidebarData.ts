import { FaHome } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { FaBars } from "react-icons/fa";

const sidebarData: Array<{
    id: number,
    title: string,
    url: string,
    icon: React.ComponentType,
    children?: Array<{
        id: number,
        title: string,
        url: string,
    }>
}> = [
        {
            id: 1,
            title: 'dashboard',
            url: ``,
            icon: FaHome,
        },
        {
            id: 2,
            title: 'menu',
            url: `menu`,
            icon: FaBars,
        },
        {
            id: 3,
            title: 'site_settings',
            url: `settings`,
            icon: FaGear,
        },
        {
            id: 4,
            title: 'users',
            url: `users`,
            icon: HiMiniUsers,
        },
    ]

export default sidebarData;