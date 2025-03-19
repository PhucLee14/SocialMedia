import { Box } from "@mui/material";
import DefaultLayout from "./DefaultLayout";
import React from "react";
import PageLink from "../components/PageLink";

function EditProfileLayout({ children }) {
    return (
        <Box sx={{ display: "flex" }}>
            <DefaultLayout></DefaultLayout>
            <Box sx={{ display: "flex", width: "100%" }}>
                <Box
                    sx={{
                        width: "330px",
                        borderRight: "1px solid #dbdbdb",
                        padding: "16px 0",
                        height: "100vh",
                        overflowY: "scroll",
                    }}
                >
                    <p
                        style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            margin: "0 34px 24px",
                            padding: "16px",
                        }}
                    >
                        Settings
                    </p>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: "0 22px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "14px",
                                color: "#737373",
                                fontWeight: "600",
                                padding: "0 8px",
                                margin: "12px",
                            }}
                        >
                            How you use Instagram
                        </p>
                        <Box>
                            <PageLink
                                icon={<i class="fa-regular fa-circle-user"></i>}
                                title="Edit profile"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={<i class="fa-regular fa-bell"></i>}
                                title="Notifications"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: "0 22px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "14px",
                                color: "#737373",
                                fontWeight: "600",
                                padding: "0 8px",
                                margin: "12px",
                            }}
                        >
                            Who can see your content
                        </p>
                        <Box>
                            <PageLink
                                icon={<i class="fa-regular fa-lock"></i>}
                                title="Account privacy"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={<i class="fa-regular fa-circle-star"></i>}
                                title="Close friends"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={
                                    <i class="fa-regular fa-shield-slash"></i>
                                }
                                title="Blocked"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={
                                    <i class="fa-regular fa-circle-dashed"></i>
                                }
                                title="Hide story and live"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: "0 22px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "14px",
                                color: "#737373",
                                fontWeight: "600",
                                padding: "0 8px",
                                margin: "12px",
                            }}
                        >
                            How others can interact with you
                        </p>
                        <Box>
                            <PageLink
                                icon={
                                    <i class="fa-brands fa-facebook-messenger"></i>
                                }
                                title="Messages and story replies"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={<i class="fa-regular fa-at"></i>}
                                title="Tags and mentions"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={<i class="fa-regular fa-comment"></i>}
                                title="Comments"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={<i class="fa-solid fa-repeat"></i>}
                                title="Sharing"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={
                                    <i class="fa-regular fa-user-large-slash"></i>
                                }
                                title="Restricted accounts"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={
                                    <i class="fa-regular fa-circle-dashed"></i>
                                }
                                title="Hidden Words"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: "0 22px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "14px",
                                color: "#737373",
                                fontWeight: "600",
                                padding: "0 8px",
                                margin: "12px",
                            }}
                        >
                            What you see
                        </p>
                        <Box>
                            <PageLink
                                icon={<i class="fa-regular fa-bell-slash"></i>}
                                title="Muted accounts"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={<i class="fa-solid fa-photo-film"></i>}
                                title="Content preferences"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={
                                    <i class="fa-regular fa-heart-circle-exclamation"></i>
                                }
                                title="Like and share counts"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={<i class="fa-regular fa-crown"></i>}
                                title="Subscriptions"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: "0 22px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "14px",
                                color: "#737373",
                                fontWeight: "600",
                                padding: "0 8px",
                                margin: "12px",
                            }}
                        >
                            Your app and media
                        </p>
                        <Box>
                            <PageLink
                                icon={<i class="fa-solid fa-down-to-line"></i>}
                                title="Archiving and downloading"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={<i class="fa-solid fa-language"></i>}
                                title="Language"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                            <PageLink
                                icon={<i class="fa-solid fa-laptop-mobile"></i>}
                                title="Website permissions"
                                my="0"
                                fontSize="14px"
                            ></PageLink>
                        </Box>
                    </Box>
                </Box>
                {children}
            </Box>
        </Box>
    );
}

export default EditProfileLayout;
