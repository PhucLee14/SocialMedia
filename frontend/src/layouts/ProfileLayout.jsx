import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import DefaultLayout from "./DefaultLayout";
import { Link, useParams } from "react-router-dom";
import { getUserByUserName } from "../services/userService";
import { getPostByUserId } from "../services/postService";

function ProfileLayout({ children }) {
    const param = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await getUserByUserName(param.userName);
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        const getPost = async () => {
            try {
                const data = await getPostByUserId(user._id);
                console.log(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        getUser();
        getPost();
    }, []);
    return user ? (
        <Box sx={{ display: "flex" }}>
            <DefaultLayout></DefaultLayout>

            <Box
                sx={{
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "absolute",
                    left: "128px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        maxWidth: "940px",
                        width: "940px",
                        marginTop: "4rem",
                        borderBottom: "1px solid #D1D5DB",
                        paddingBottom: "3rem",
                    }}
                >
                    <img
                        src={user.profilePicture}
                        alt=""
                        style={{
                            width: "9rem",
                            height: "9rem",
                            borderRadius: "50%",
                            marginRight: "6rem",
                            marginLeft: "4rem",
                        }}
                    />
                    <Box
                        sx={{
                            width: "100%",
                            height: "9rem",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "1.25rem",
                                    marginRight: "1rem",
                                }}
                            >
                                {user.userName}
                            </p>
                            <Link
                                style={{
                                    borderRadius: "0.5rem",
                                    backgroundColor: "#efefef",
                                    padding: "0.5rem 0.75rem",
                                    marginRight: "0.5rem",
                                    textDecoration: "none",
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                }}
                                to={`/account/edit`}
                            >
                                Edit profile
                            </Link>
                            <Link
                                style={{
                                    borderRadius: "0.5rem",
                                    backgroundColor: "#efefef",
                                    padding: "0.5rem 0.75rem",
                                    textDecoration: "none",
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                }}
                            >
                                View archive
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                marginY: "2rem",
                            }}
                        >
                            <Box
                                sx={{
                                    fontWeight: "600",
                                    display: "flex",
                                }}
                            >
                                <p>0</p>
                                <p
                                    style={{
                                        fontWeight: "300",
                                        color: "#737373",
                                        marginLeft: "0.25rem",
                                    }}
                                >
                                    posts
                                </p>
                            </Box>
                            <Box
                                sx={{
                                    fontWeight: "600",
                                    display: "flex",
                                    marginX: "2.5rem",
                                }}
                            >
                                <p>{user.followers.length}</p>
                                <p
                                    style={{
                                        fontWeight: "300",
                                        color: "#737373",
                                        marginLeft: "0.25rem",
                                    }}
                                >
                                    followers
                                </p>
                            </Box>
                            <Box
                                sx={{
                                    fontWeight: "600",
                                    display: "flex",
                                }}
                            >
                                <p>{user.following.length}</p>
                                <p
                                    style={{
                                        fontWeight: "300",
                                        color: "#737373",
                                        marginLeft: "0.25rem",
                                    }}
                                >
                                    following
                                </p>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                fontWeight: "600",
                            }}
                        >
                            {user.fullName}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", gap: "4rem" }}>
                    <Box
                        component={Link}
                        to={`/${param.userName}`}
                        sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            padding: "16px 0",
                        }}
                    >
                        <i class="fa-solid fa-table-cells"></i> POST
                    </Box>
                    <Box
                        component={Link}
                        to={`/${param.userName}/saved`}
                        sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            padding: "16px 0",
                        }}
                    >
                        <i class="fa-regular fa-bookmark"></i> SAVED
                    </Box>
                    <Box
                        component={Link}
                        to={`/${param.userName}/tagged`}
                        sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            padding: "16px 0",
                        }}
                    >
                        <i class="fa-regular fa-image-polaroid-user"></i> TAGGED
                    </Box>
                </Box>
                {children}
            </Box>
        </Box>
    ) : (
        ""
    );
}

export default ProfileLayout;
