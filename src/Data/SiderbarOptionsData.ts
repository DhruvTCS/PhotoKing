import DashboardIcon from '../assets/Icons/Sidebar/dashboard.png'
import DashboardWhite from '../assets/Icons/Sidebar/dashboardwhite.png'
import Subscription from '../assets/Icons/Sidebar/subscription.png'
import SubscriptionWhite from '../assets/Icons/Sidebar/subscription_white.png'
import Album from '../assets/Icons/Sidebar/album.png'
import AlbumWhite from '../assets/Icons/Sidebar/album_white.png'
import Member from '../assets/Icons/Sidebar/members.png'
import MemberWhite from '../assets/Icons/Sidebar/members_white.png'
import Mobile from '../assets/Icons/Sidebar/changepassword.png'
import MobileWhite from '../assets/Icons/Sidebar/changepassword_white.png'
import AboutUs from '../assets/Icons/Sidebar/aboutus.png'
import AboutUsWhite from '../assets/Icons/Sidebar/aboutus_white.png'
import ContactUs from '../assets/Icons/Sidebar/contactus.png'
import ContactUsWhite from '../assets/Icons/Sidebar/contactus_white.png'
import Privacy from '../assets/Icons/Sidebar/privacypolicy.png'
import PrivacyWhite from '../assets/Icons/Sidebar/privacypolicy_white.png'
import TnC from '../assets/Icons/Sidebar/termsandconditions.png'
import TnCWhite from '../assets/Icons/Sidebar/termsandconditions_white.png'
import Delete from '../assets/Icons/Sidebar/deleteaccount.png'
import DeleteWhite from '../assets/Icons/Sidebar/deleteaccount_white.png'
import Logout from '../assets/Icons/Sidebar/logout.png'
import LogOutWhite from '../assets/Icons/Sidebar/logout_white.png'

export const sidebarOptions = [
    {
        key: "Dashboard",
        icon: DashboardIcon,
        whiteIcon: DashboardWhite,
        redirection: "/dashboard/"
    },
    {
        key: "Subscriptions",
        icon: Subscription,
        whiteIcon: SubscriptionWhite,
        redirection: "/dashboard/subscriptions"
    },
    {
        key: "Albums",
        icon: Album,
        whiteIcon: AlbumWhite,
        redirection: "/dashboard/albums/all"
    },
    {
        key: "Members",
        icon: Member,
        whiteIcon: MemberWhite,
        redirection: "/dashboard/members/all"
    },
    {
        key: "Change Password",
        icon: Mobile,
        whiteIcon: MobileWhite,
        redirection: "/dashboard/chnagepassword"
    },
    {
        key: "About Us",
        icon: AboutUs,
        whiteIcon: AboutUsWhite,
        redirection: "/dashboard/aboutus"
    },
    {
        key: "Contact Us",
        icon: ContactUs,
        whiteIcon: ContactUsWhite,
        redirection: "/dashboard/contactus"
    },
    {
        key: "Privacy Policy",
        icon: Privacy,
        whiteIcon: PrivacyWhite,
        redirection: "/dashboard/privacy"
    },
    {
        key: "Terms and Conditions",
        icon: TnC,
        whiteIcon: TnCWhite,
        redirection: "/dashboard/terms"
    },
    {
        key: "Delete Account",
        icon: Delete,
        whiteIcon: DeleteWhite,
        redirection: "/dashboard/delete/account"
    },
    {
        key: "Logout",
        isPng: true,
        icon: Logout,
        whiteIcon: LogOutWhite,
        redirection: "/dashboard/logout"
    }
]

export interface OptionProps {
    isActive: boolean;
    isExpanded: boolean;
}