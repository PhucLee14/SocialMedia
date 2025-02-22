import React, { useState } from "react";
import PageLink from "../components/PageLink";
import { Link } from "react-router-dom";
import SearchPopup from "../components/Popup/SearchPopup";

function LayoutIcon({ children }) {
    const [display, setDisplay] = useState(false);
    return (
        <div className="flex">
            <div className="w-18 h-screen border-r border-gray-300 flex flex-col">
                <div className="w-full py-6 flex justify-center h-24">
                    <Link to="/" className="text-2xl block px-4">
                        <i class="fa-brands fa-instagram"></i>
                    </Link>
                </div>
                <PageLink
                    icon={<i className="fa-light fa-house"></i>}
                    link="/"
                    width="w-12"
                />
                <PageLink
                    icon={<i className="fa-light fa-magnifying-glass"></i>}
                    width="w-12"
                    onClick={() => setDisplay(!display)}
                />
                <PageLink
                    icon={<i className="fa-light fa-compass"></i>}
                    link="/explore"
                    width="w-12"
                />
                <PageLink
                    icon={<i className="fa-light fa-clapperboard-play"></i>}
                    link="/reels"
                    width="w-12"
                />
                <PageLink
                    icon={<i className="fa-light fa-paper-plane"></i>}
                    link="/messages"
                    width="w-12"
                />
                <PageLink
                    icon={<i className="fa-light fa-heart"></i>}
                    width="w-12"
                />
                <PageLink
                    icon={<i className="fa-light fa-square-plus"></i>}
                    width="w-12"
                />
                <PageLink
                    icon={<i className="fa-light fa-user"></i>}
                    link="/"
                    width="w-12"
                />
            </div>
            <div>{display ? <SearchPopup /> : ""}</div>
            <div>{children}</div>
        </div>
    );
}

export default LayoutIcon;
