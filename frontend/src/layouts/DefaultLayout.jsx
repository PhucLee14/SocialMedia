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
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    console.log("user layout: ", user);

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
                    width={navWidth}
                    borderRight="1px solid #ddd"
                    justifyContent="space-between"
                    zIndex={10}
                    style={{
                        width: navWidth,
                        transition: " width .3s",
                    }}
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
                                {navWidth === 250 ? (
                                    <p
                                        style={{
                                            textAlign: "left",
                                            marginLeft: "26px",
                                        }}
                                    >
                                        Onstagram
                                    </p>
                                ) : (
                                    <i class="fa-brands fa-instagram"></i>
                                )}
                            </Link>
                        </Box>

                        <PageLink
                            icon={<i className="fa-regular fa-house"></i>}
                            title={navWidth === 250 ? "Home" : ""}
                            link="/"
                        />

                        <PageLink
                            icon={
                                <i className="fa-regular fa-magnifying-glass"></i>
                            }
                            title={navWidth === 250 ? "Search" : ""}
                            onClick={handleSearchOpen}
                        />
                        <PageLink
                            icon={<i className="fa-regular fa-compass"></i>}
                            title={navWidth === 250 ? "Explore" : ""}
                            link="/explore"
                        />
                        <PageLink
                            icon={
                                <i className="fa-regular fa-clapperboard-play"></i>
                            }
                            title={navWidth === 250 ? "Reels" : ""}
                            link="/reels"
                        />
                        <PageLink
                            icon={<i className="fa-regular fa-paper-plane"></i>}
                            title={navWidth === 250 ? "Messages" : ""}
                            link="/messages"
                        />
                        <PageLink
                            icon={<i className="fa-regular fa-heart"></i>}
                            title={navWidth === 250 ? "Notifications" : ""}
                        />
                        <PageLink
                            icon={<i className="fa-regular fa-square-plus"></i>}
                            title={navWidth === 250 ? "Create" : ""}
                            onClick={() => setCreateModal(true)}
                        />

                        {user && (
                            <PageLink
                                img={user.profilePicture}
                                title={navWidth === 250 ? "Profile" : ""}
                                link={`/${user.userName}`}
                            />
                        )}
                    </Box>

                    <Box padding={2}>
                        <Box
                            onClick={handleMenuOpen}
                            display={"flex"}
                            alignItems={"center"}
                            gap={2}
                            fontSize={20}
                            padding={1}
                            borderRadius={2}
                            sx={{
                                cursor: "pointer",
                                "&:hover": { backgroundColor: "#efefef" },
                            }}
                        >
                            <i className="fa-regular fa-bars"></i>
                            <Box fontSize={16}>More</Box>
                        </Box>
                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={handleMenuClose}
                            sx={{ borderRadius: "12px", padding: "10px" }}
                        >
                            {/* <MenuItem>Item 1</MenuItem> */}
                            <MenuItem
                                sx={{
                                    width: "200px",
                                }}
                                onClick={handleLogout}
                            >
                                Log out
                            </MenuItem>
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

            <Box flex={1} marginLeft="250px">
                {children}
            </Box>

            {createModal && (
                <CreatePostModal onClick={() => setCreateModal(false)} />
            )}
        </Box>
    );
}

export default DefaultLayout;
