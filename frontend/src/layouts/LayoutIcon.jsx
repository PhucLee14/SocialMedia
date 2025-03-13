import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    ClickAwayListener,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Paper,
    Typography,
    Divider,
} from "@mui/material";
import PageLink from "../components/PageLink";
import SearchPopup from "../components/Popup/SearchPopup";
import { getUser } from "../services/userService";
import { logout } from "../services/authService";
import CreatePostModal from "../components/CreatePostModal";

function DefaultLayout({ children }) {
    const nav = useNavigate();
    const [display, setDisplay] = useState(false);
    const [user, setUser] = useState(null);
    const [createModal, setCreateModal] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [openSearch, setOpenSearch] = useState(false);
    const [navWidth, setNavWidth] = useState(250);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser();
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

    const handleSearch = () => {
        setDisplay(!display);
    };

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleSearchOpen = () => {
        setNavWidth(72);
        setOpenSearch(true);
    };
    const handleSearchClose = () => {
        setNavWidth(250);
        setOpenSearch(false);
    };

    return (
        <Box display="flex">
            <Box width={250} display="flex" position={"fixed"}>
                <Box
                    display="flex"
                    flexDirection="column"
                    height="100vh"
                    width="72px"
                    borderRight="1px solid #ddd"
                    justifyContent="space-between"
                    zIndex={10}
                >
                    <Box>
                        <Box py={3} textAlign="center">
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    fontSize: 24,
                                    fontWeight: "bold",
                                }}
                            >
                                <i class="fa-brands fa-instagram"></i>
                            </Link>
                        </Box>

                        <PageLink
                            icon={<i className="fa-regular fa-house"></i>}
                            width="48px"
                            link="/"
                        />

                        <PageLink
                            icon={
                                <i className="fa-regular fa-magnifying-glass"></i>
                            }
                            width="48px"
                            onClick={handleSearchOpen}
                        />
                        <PageLink
                            icon={<i className="fa-regular fa-compass"></i>}
                            width="48px"
                            link="/explore"
                        />
                        <PageLink
                            icon={
                                <i className="fa-regular fa-clapperboard-play"></i>
                            }
                            width="48px"
                            link="/reels"
                        />
                        <PageLink
                            icon={<i className="fa-regular fa-paper-plane"></i>}
                            width="48px"
                            link="/messages"
                        />
                        <PageLink
                            icon={<i className="fa-regular fa-heart"></i>}
                            width="48px"
                        />
                        <PageLink
                            icon={<i className="fa-regular fa-square-plus"></i>}
                            width="48px"
                            onClick={() => setCreateModal(true)}
                        />

                        {user && (
                            <PageLink
                                img={user.profilePicture}
                                width="48px"
                                link={`/${user.userName}`}
                            />
                        )}
                    </Box>

                    <Box display="flex" justifyContent="center">
                        <IconButton onClick={handleMenuOpen}>
                            <i className="fa-regular fa-bars"></i>
                        </IconButton>
                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem>Item 1</MenuItem>
                            <MenuItem onClick={handleLogout}>Log out</MenuItem>
                        </Menu>
                    </Box>
                </Box>

                {openSearch && (
                    <ClickAwayListener onClickAway={handleSearchClose}>
                        <div>
                            <SearchPopup />{" "}
                        </div>
                    </ClickAwayListener>
                )}
            </Box>

            <Box flex={1} marginLeft="72px">
                {children}
            </Box>

            {createModal && (
                <CreatePostModal onClick={() => setCreateModal(false)} />
            )}
        </Box>
    );
}

export default DefaultLayout;
