import EditProfileLayout from "../layouts/EditProfileLayout";
import LayoutIcon from "../layouts/LayoutIcon";
import EditProfile from "../pages/SettingPages/EditProfile";
import Explore from "../pages/Explore";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";
import Reels from "../pages/Reels";
import Register from "../pages/Register";
import MessageLayout from "../layouts/MessageLayout";
import MessageEmpty from "../pages/MessageEmpty";

const publicRoutes = [
    { path: "/login", component: Login, layout: null },
    { path: "/register", component: Register, layout: null },
    { path: "/forgotpassword", component: ForgotPassword, layout: null },
];

const privateRoutes = [
    { path: "/", component: Home },
    {
        path: "/account/edit",
        component: EditProfile,
        layout: EditProfileLayout,
    },
    { path: "/:userName", component: Profile },
    { path: "/explore", component: Explore },
    { path: "/reels", component: Reels },
    { path: "/messages", component: MessageEmpty, layout: MessageLayout },
    { path: "/messages/:id", component: Messages, layout: MessageLayout },
];

export { publicRoutes, privateRoutes };
