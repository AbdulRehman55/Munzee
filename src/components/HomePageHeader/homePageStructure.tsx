import {
    Bookmark,
    CalendarMonth,
    Cloud,
    EmojiEvents,
    Leaderboard,
    LocationOn,
    MailOutline,
    Public,
    Redeem,
    Person,
    Settings,
    QrCode,
    Diversity3,
    CompareArrows,
    ThumbUp,
    ConfirmationNumber,
    BarChart,
} from "@mui/icons-material";
import React from "react";
import { APP_CONFIG } from "../../config/config";

export interface itemDataType {
    title: string;
    icon?: JSX.Element;
    link: string;
    isChild: boolean;
    childrenItems?: itemDataType[];
}

export const mockData: itemDataType[] = [
    {
        title: "Meet in Munzees",
        icon: <LocationOn />,
        link: "",
        isChild: false,
        childrenItems: [
            {
                title: "All types",
                link: "/types",
                isChild: true,
            },
            {
                title: "Virtuals",
                link: "/types",
                isChild: true,
            },
            {
                title: "Temporary Munzees",
                link: "/types",
                isChild: true,
            },
        ]
    },
    {
        title: "Munzee Blog",
        icon: <Bookmark />,
        link: "https://www.munzeeblog.com/",
        isChild: false,
    },
    {
        title: "Recently Viewed Munzees",
        icon: <Cloud />,
        link: "",
        isChild: false,
        childrenItems: [

        ]
    },
    {
        title: "View Munzee Map",
        icon: <Public />,
        link: "/map",
        isChild: false,
    },
    {
        title: "View Messages",
        icon: <MailOutline />,
        link: "/flows",
        isChild: false,
    },
    {
        title: "Leaderboards",
        icon: <EmojiEvents />,
        link: "",
        isChild: false,
        childrenItems: [
            {
                title: "Players",
                link: "/leaderboard/players/all/total",
                isChild: true,
            },
            {
                title: "Munzees",
                link: "/leaderboard/munzees",
                isChild: true,
            },
            {
                title: "Clans",
                link: "/clans",
                isChild: true,
            },
            {
                title: "Socials",
                link: "/leaderboard/munzees/social/",
                isChild: true,
            },
            {
                title: "Rovers",
                link: "/leaderboard/rovers",
                isChild: true,
            },
            {
                title: "Referral program",
                link: "/",
                isChild: true,
                childrenItems: [
                    {
                        title: "Referrals",
                        link: "/leaderboard/referral/players",
                        isChild: true,
                    },
                    {
                        title: "Referral Points",
                        link: "/leaderboard/referral/points",
                        isChild: true,
                    },
                ]
            },
        ]
    },
    {
        title: "Calendar",
        icon: <CalendarMonth />,
        link: "https://calendar.munzee.com/",
        isChild: false,
    },
    {
        title: "STATzee",
        icon: <Leaderboard />,
        link: "/statzee",
        isChild: false,
    },
    {
        title: "Store",
        icon: <Redeem />,
        link: "https://store.freezetag.com/",
        isChild: false,
    }
];

export const userProfileData = [
    {
        title: "Profile",
        icon: <Person />,
        link: "/m/id/"
    },
    {
        title: "Settings",
        icon: <Settings />,
        link: "/settings/"
    },
    {
        title: "Create",
        icon: <QrCode />,
        link: "/create/"
    },
    {
        title: "Friends",
        icon: <Diversity3 />,
        link: "/friends/"
    },
    {
        title: "Credits",
        icon: <CompareArrows />,
        link: "/credits/"
    },
    {
        title: "STATzee",
        icon: <BarChart />,
        link: APP_CONFIG.HOST_STATZEE
    },
    {
        title: "Referral Program",
        icon: <ThumbUp />,
        link: "/referral/"
    },
    {
        title: "Redeem",
        icon: <ConfirmationNumber />,
        link: "/redeem/"
    },
]