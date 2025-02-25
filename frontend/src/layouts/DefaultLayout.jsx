import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLink from "../components/PageLink";
import SearchPopup from "../components/Popup/SearchPopup";
import { getUser } from "../services/userService";
import { logout } from "../services/authService";

function DefaultLayout({ children }) {
    const nav = useNavigate();
    const [display, setDisplay] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser();
                console.log(data);
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("user");
            setUser(null);
            nav("/login");
        } catch (error) {
            console.log("error: ", error);
        }
    };

    return (
        <div className="flex">
            <div className="flex flex-col h-screen border-gray-300 w-64 border-r justify-between z-10">
                <div className="flex flex-col">
                    <div className="w-64 py-6 flex justify-centerr h-24">
                        <Link to="/" className="w-11/12 block px-2">
                            Logo
                        </Link>
                    </div>
                    <PageLink
                        icon={<i className="fa-regular fa-house"></i>}
                        title="Home"
                        link="/"
                        width="w-58"
                    />
                    <PageLink
                        icon={
                            <i className="fa-regular fa-magnifying-glass"></i>
                        }
                        title="Search"
                        width="w-58"
                        onClick={() => setDisplay(!display)}
                    />
                    <PageLink
                        icon={<i className="fa-regular fa-compass"></i>}
                        title="Explore"
                        link="/explore"
                        width="w-58"
                    />
                    <PageLink
                        icon={
                            <i className="fa-regular fa-clapperboard-play"></i>
                        }
                        title="Reels"
                        link="/reels"
                        width="w-58"
                    />
                    <PageLink
                        icon={<i className="fa-regular fa-paper-plane"></i>}
                        title="Messages"
                        link="/messages"
                        width="w-58"
                    />
                    <PageLink
                        icon={<i className="fa-regular fa-heart"></i>}
                        title="Notifications"
                        width="w-58"
                    />
                    <PageLink
                        icon={<i className="fa-regular fa-square-plus"></i>}
                        title="Create"
                        width="w-58"
                    />
                    {user ? (
                        <PageLink
                            img={user.profilePicture}
                            title="Profile"
                            link={`/${user.userName}`}
                            width="w-58"
                        />
                    ) : (
                        ""
                    )}
                </div>
                <div className="justify-end items-center flex flex-col">
                    <div className="dropdown dropdown-top">
                        <PageLink
                            icon={<i class="fa-regular fa-bars"></i>}
                            title="More"
                            width="w-58"
                        />
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                        >
                            <li>
                                <a>Item 1</a>
                            </li>
                            <li onClick={() => handleLogout()}>
                                <a>Log out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>{display ? <SearchPopup /> : ""}</div>
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
