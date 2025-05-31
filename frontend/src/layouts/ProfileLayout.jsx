import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import DefaultLayout from "./DefaultLayout";
import { Link, useParams } from "react-router-dom";
import { followUser, getUserByUserName } from "../services/userService";
import { getPostByUserId } from "../services/postService";
import FollowingListModal from "../components/Modal/FollowingListModal";
import FollowerListModal from "../components/Modal/FollowerListModal";

function ProfileLayout({ children }) {
    const me = JSON.parse(localStorage.getItem("user"));
    const param = useParams();
    const [user, setUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followingList, setFollowingList] = useState(false);
    const [followersList, setFollowersList] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await getUserByUserName(param.userName);
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        getUser();
    }, [param]);

    useEffect(() => {
        const checkFollowing = () => {
            if (user && me) {
                const isFollowing = user.followers.includes(me._id);
                setIsFollowing(isFollowing);
            }
        };
        checkFollowing();
    }, [user]);

    const handleFollowUser = async () => {
        try {
            setIsFollowing((prev) => !prev);
            await followUser(me._id, user._id);
        } catch (error) {
            console.log(error);
        }
    };

    console.log("isFollowing", isFollowing);

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
                    zIndex: "-1",
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
                            {me._id === user._id ? (
                                <>
                                    <Link
                                        style={{
                                            borderRadius: "0.5rem",
                                            backgroundColor: "#efefef",
                                            padding: "7px 16px",
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
                                            padding: "7px 16px",
                                            textDecoration: "none",
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                        }}
                                    >
                                        View archive
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Box onClick={() => handleFollowUser()}>
                                        {" "}
                                        {isFollowing ? (
                                            <Box
                                                sx={{
                                                    borderRadius: "0.5rem",
                                                    backgroundColor: "#efefef",
                                                    color: "#000",
                                                    padding: "7px 16px",
                                                    marginRight: "0.5rem",
                                                    textDecoration: "none",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "600",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Following{" "}
                                                <i class="fa-light fa-chevron-down"></i>
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    borderRadius: "0.5rem",
                                                    backgroundColor: "#0095e7",
                                                    color: "#fff",
                                                    padding: "7px 16px",
                                                    marginRight: "0.5rem",
                                                    textDecoration: "none",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "600",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Follow
                                            </Box>
                                        )}
                                    </Box>
                                    <Link
                                        style={{
                                            borderRadius: "0.5rem",
                                            backgroundColor: "#efefef",
                                            padding: "7px 16px",
                                            textDecoration: "none",
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                        }}
                                        to={`/messages/${user._id}`}
                                    >
                                        Message
                                    </Link>
                                </>
                            )}
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
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setFollowersList(true);
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
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setFollowingList(true);
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
            {followingList ? (
                <FollowingListModal
                    user={user}
                    onClick={() => {
                        setFollowingList(false);
                    }}
                    followingList={user.following}
                />
            ) : (
                ""
            )}
            {followersList ? (
                <FollowerListModal
                    user={user}
                    onClick={() => {
                        setFollowersList(false);
                    }}
                    followerList={user.followers}
                />
            ) : (
                ""
            )}
        </Box>
    ) : (
        ""
    );
}

export default ProfileLayout;
