import DashboardIcon from '../assets/Icons/Sidebar/dashboard.png'
import DashboardWhite from '../assets/Icons/Sidebar/dashboardwhite.png'
import Subscription from '../assets/Icons/Sidebar/subscription.png'
import SubscriptionWhite from '../assets/Icons/Sidebar/subscription_white.png'
import Album from '../assets/Icons/Sidebar/album.png'
import AlbumWhite from '../assets/Icons/Sidebar/album_white.png'
import Member from '../assets/Icons/Sidebar/members.png'
import MemberWhite from '../assets/Icons/Sidebar/members_white.png'
import PackagePNG from '../assets/Icons/Sidebar/package.png'
import PackageWhite from '../assets/Icons/Sidebar/package-white.png'
import Privacy from '../assets/Icons/Sidebar/privacypolicy.png'
import PrivacyWhite from '../assets/Icons/Sidebar/privacypolicy_white.png'
import Calander from '../assets/Icons/Sidebar/calendar.png'
import CalenderWhite from '../assets/Icons/Sidebar/calendarWhite.png'
import CustomerEvent from '../assets/Icons/Sidebar/customer_events.png'
import CustomerEventWhite from '../assets/Icons/Sidebar/customer_events_white.png'

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
        key: "Event Scheduling",
        icon: Calander,
        whiteIcon: CalenderWhite,
        redirection: "/dashboard/event"
    },
    {
        key: "My Packages",
        icon: PackagePNG,
        whiteIcon: PackageWhite,
        redirection: "/dashboard/packages/all"
    },
    {
        key: "Customers Events",
        icon: CustomerEvent,
        whiteIcon: CustomerEventWhite,
        redirection: "/dashboard/events/userCreated"
    },


]

export interface OptionProps {
    isActive: boolean;
    isExpanded: boolean;
}