import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <Link to="/admin">Trang chủ</Link>
            <Link to="/admin/newsfeed">Bài viết</Link>
            <Link to="/admin/certificate">Minh chứng</Link>
        </div>
    );
};

export default Navbar;
