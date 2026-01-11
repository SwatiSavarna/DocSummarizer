import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA=[
    {
        id:"01",
        label:"Profile",
        icon:LuLayoutDashboard,
        path:"/profile",
    },
    {
        id:"02",
        label:"Documents",
        icon:LuWalletMinimal,
        path:"/upload",
    },
    {
        id:"03",
        label:"Summaries",
        icon:LuHandCoins,
        path:"/summary",
    },
    {
        id:"06",
        label:"Logout",
        icon:LuLogOut,
        path:"logout",
    },
];