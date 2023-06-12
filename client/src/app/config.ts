import {
    FiHome,
    FiTrendingUp
} from "react-icons/fi";

export const linkItems = [
    {
        name: "Sites",
        icon: FiHome,
        to: "/",
    },
    {
        name: "Pages",
        icon: FiTrendingUp,
        to: "/pages/" + localStorage.getItem("siteId"),
    },
    {
        name: "Sections",
        icon: FiTrendingUp,
        to: "/sections/" + localStorage.getItem("pageId"),
    },
];

export const config = {
    siteName: "Documentor"
}