import LayoutIcon from "../layouts/LayoutIcon";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import Messages from "../pages/Messages";
import Reels from "../pages/Reels";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/explore", component: Explore },
    { path: "/reels", component: Reels },
    { path: "/messages", component: Messages, layout: LayoutIcon },
];

const privateRoute = [];

export { publicRoutes, privateRoute };
