import EditProfileLayout from "../layouts/EditProfileLayout";
import MessageLayout from "../layouts/MessageLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import EditProfile from "../pages/SettingPages/EditProfile";
import Explore from "../pages/Explore";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile/Profile";
import Reels from "../pages/Reels";
import Register from "../pages/Register";
import MessageEmpty from "../pages/MessageEmpty";
import ProfileSaved from "../pages/Profile/ProfileSaved";
import ProfileTagged from "../pages/Profile/ProfileTagged";
import PostDetail from "../pages/PostDetail";
import DefaultLayout from "../layouts/DefaultLayout";
import ResetPassword from "../pages/ResetPassword";
import SendMailSuccess from "../pages/SendMailSuccess";

const publicRoutes = [
    { path: "/login", component: Login, layout: null },
    { path: "/register", component: Register, layout: null },
    { path: "/forgotpassword", component: ForgotPassword, layout: null },
    {
        path: "/forgotpassword/success",
        component: SendMailSuccess,
        layout: null,
    },
    { path: "/resetpassword/:token", component: ResetPassword, layout: null },
];

const privateRoutes = [
    { path: "/", component: Home },
    {
        path: "/account/edit",
        component: EditProfile,
        layout: EditProfileLayout,
    },
    { path: "/:userName", component: Profile, layout: ProfileLayout },
    {
        path: "/:userName/:postId",
        component: PostDetail,
        layout: DefaultLayout,
    },
    {
        path: "/:userName/saved",
        component: ProfileSaved,
        layout: ProfileLayout,
    },
    {
        path: "/:userName/tagged",
        component: ProfileTagged,
        layout: ProfileLayout,
    },
    { path: "/explore", component: Explore },
    { path: "/reels", component: Reels },
    { path: "/messages", component: MessageEmpty, layout: MessageLayout },
    { path: "/messages/:id", component: Messages, layout: MessageLayout },
];

export { publicRoutes, privateRoutes };
