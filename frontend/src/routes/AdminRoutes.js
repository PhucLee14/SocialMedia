import HomeAdmin from "../admin/pages/Home/HomeAdmin";
import AdminCertificate from "../admin/pages/certificate/AdminCertificate";
import AdminNews from "../admin/pages/newsfeed/AdminNews";

const publicAdminRoutes = [
    { path: "/admin", component: HomeAdmin },
    { path: "/admin/newsfeed", component: AdminNews },
    { path: "/admin/certificate", component: AdminCertificate },
];

const privateAdminRoute = [];

export { publicAdminRoutes, privateAdminRoute };
