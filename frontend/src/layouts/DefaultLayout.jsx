import React, { useState } from "react";
import PageLink from "../components/PageLink";
import { Link } from "react-router-dom";
import SearchPopup from "../components/Popup/SearchPopup";

function DefaultLayout({ children }) {
    const [display, setDisplay] = useState(false);
    return (
        <div className="flex">
            <div className="w-64 h-screen border-r border-gray-300 flex flex-col">
                <div className="w-64 py-6 flex justify-centerr h-24">
                    <Link to="/" className="w-11/12 block px-2">
                        Logo
                    </Link>
                </div>
                <PageLink
                    icon={<i className="fa-light fa-house"></i>}
                    title="Home"
                    link="/"
                    width="w-58"
                />
                <PageLink
                    icon={<i className="fa-light fa-magnifying-glass"></i>}
                    title="Search"
                    width="w-58"
                    onClick={() => setDisplay(!display)}
                />
                <PageLink
                    icon={<i className="fa-light fa-compass"></i>}
                    title="Explore"
                    link="/explore"
                    width="w-58"
                />
                <PageLink
                    icon={<i className="fa-light fa-clapperboard-play"></i>}
                    title="Reels"
                    link="/reels"
                    width="w-58"
                />
                <PageLink
                    icon={<i className="fa-light fa-paper-plane"></i>}
                    title="Messages"
                    link="/messages"
                    width="w-58"
                />
                <PageLink
                    icon={<i className="fa-light fa-heart"></i>}
                    title="Notifications"
                    width="w-58"
                />
                <PageLink
                    icon={<i className="fa-light fa-square-plus"></i>}
                    title="Create"
                    width="w-58"
                />
                <PageLink
                    icon={<i className="fa-light fa-user"></i>}
                    title="Profile"
                    link="/"
                    width="w-58"
                />
            </div>
            <div>{display ? <SearchPopup /> : ""}</div>
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
