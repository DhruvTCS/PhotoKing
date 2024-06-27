import { ReactComponent as TandC } from '../assets/Icons/Sidebar/TandC.svg'
import { ReactComponent as Aboutus } from '../assets/Icons/Sidebar/aboutus.svg'
import { ReactComponent as Albums } from '../assets/Icons/Sidebar/albums.svg'
import { ReactComponent as ContactUs } from '../assets/Icons/Sidebar/contactus.svg'
import { ReactComponent as Delete } from '../assets/Icons/Sidebar/delete.svg'
import { ReactComponent as Logout } from '../assets/Icons/Sidebar/logout.svg'
import { ReactComponent as Members } from '../assets/Icons/Sidebar/members.svg'
import { ReactComponent as Mobile } from '../assets/Icons/Sidebar/mobile.svg'
import { ReactComponent as Privacy } from '../assets/Icons/Sidebar/privacy.svg'
import { ReactComponent as Subscriptions } from '../assets/Icons/Sidebar/subscription.svg'
import DeletePng from '../assets/Icons/Sidebar/DeleteAcc.png'
import LogoutPNG from '../assets/Icons/Sidebar/Logout.png'

export const sidebarOptions = [
    {
        key: "Dashboard",
        icon: Subscriptions,
        redirection: "/dashboard/"
    },
    {
        key: "Subscriptions",
        icon: Subscriptions,
        redirection: "/dashboard/subscriptions"
    },
    {
        key: "Albums",
        icon: Albums,
        redirection: "/dashboard/albums/all"
    },
    {
        key: "Members",
        icon: Members,
        redirection: "/dashboard/members/all"
    },
    {
        key: "Change Password",
        icon: Mobile,
        redirection: "/dashboard/chnagepassword"
    },
    {
        key: "About Us",
        icon: Aboutus,
        redirection: "/dashboard/aboutus"
    },
    {
        key: "Contact Us",
        icon: ContactUs,
        redirection: "/dashboard/contactus"
    },
    {
        key: "Privacy Policy",
        icon: Privacy,
        redirection: "/dashboard/sharecode"
    },
    {
        key: "Terms and Conditions",
        icon: TandC,
        redirection: "/dashboard/terms"
    },
    {
        key: "Delete Account",
        icon: DeletePng,
        isPng: true,
        redirection: "/dashboard/deletAcc"
    },
    {
        key: "Logout",
        isPng: true,
        icon: LogoutPNG,
        redirection: "/dashboard/logout"
    }
]

export interface OptionProps {
    isActive: boolean;
}