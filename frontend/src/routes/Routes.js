import LayoutIcon from "../layouts/LayoutIcon";
import Explore from "../pages/Explore";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";
import Reels from "../pages/Reels";
import Register from "../pages/Register";

const publicRoutes = [
    { path: "/login", component: Login, layout: null },
    { path: "/register", component: Register, layout: null },
    { path: "/forgotpassword", component: ForgotPassword, layout: null },
];

const privateRoutes = [
    { path: "/", component: Home },
    { path: "/explore", component: Explore },
    { path: "/reels", component: Reels },
    { path: "/messages", component: Messages, layout: LayoutIcon },
    { path: "/:userName", component: Profile },
];

export { publicRoutes, privateRoutes };
