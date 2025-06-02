import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
    getUser,
    getUserById,
    postLiked,
    postSaved,
} from "../services/userService";
import { Link } from "react-router-dom";
import { getPosts, likePost, savePost } from "../services/postService";
import Post from "../components/Post";
import StorySlide from "../components/Story/StorySlide";
import Suggestion from "../components/Suggestion/Suggestion";
import SwitchAcccountModal from "../components/Modal/SwitchAcccountModal";

function Home() {
    const me = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [likedPosts, setLikedPosts] = useState({});
    const [savedPosts, setSavedPosts] = useState({});
    const [following, setFollowing] = useState([]);
    const [modalSwitch, setModalSwitch] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch post:", error);
            }
        };
        const fetchUsers = async () => {
            try {
                const data = await getUser();
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        const fetchFollowing = async () => {
            try {
                const data = await getUserById(me._id);
                setFollowing(data.following);
            } catch (error) {
                console.error("Failed to fetch following:", error);
            }
        };

        fetchUsers();
        fetchPosts();
        fetchFollowing();
    }, []);

    useEffect(() => {
        if (posts && user) {
            const initialLikedPosts = posts.reduce((acc, post) => {
                acc[post._id] = {
                    isLiked: post.likes.includes(user._id),
                    countLikes: post.likes.length,
                };
                return acc;
            }, {});
            setLikedPosts(initialLikedPosts);
        }
        if (posts && user) {
            const initialSavedPosts = posts.reduce((acc, post) => {
                acc[post._id] = post.saves.includes(user._id);
                return acc;
            }, {});
            setSavedPosts(initialSavedPosts);
        }
    }, [posts, user]);

    const handleLikePost = async (post) => {
        try {
            setLikedPosts((prev) => ({
                ...prev,
                [post._id]: {
                    isLiked: !prev[post._id].isLiked,
                    countLikes: prev[post._id].isLiked
                        ? prev[post._id].countLikes - 1
                        : prev[post._id].countLikes + 1,
                },
            }));
            await postLiked(user._id, post._id);
            await likePost(post._id, user._id);
        } catch (error) {
            console.error("Failed to like post:", error);
        }
    };

    const handleSavePost = async (post) => {
        try {
            setSavedPosts((prev) => ({
                ...prev,
                [post._id]: !prev[post._id],
            }));
            const postSavedResponse = await postSaved(user._id, post._id);
            console.log("postSaved response:", postSavedResponse);

            const savePostResponse = await savePost(post._id, user._id);
            console.log("savePost response:", savePostResponse);
        } catch (error) {
            setSavedPosts((prev) => ({
                ...prev,
                [post._id]: prev[post._id],
            }));
            console.log(error);
        }
    };

    return user && posts ? (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
            }}
        >
            <Box display={"flex"} flexDirection={"column"}>
                <Box justifySelf={"start"} sx={{ width: 630 }}>
                    <StorySlide />
                </Box>
                <Box sx={{ width: 630 }}>
                    {posts && posts.length > 0 ? (
                        (() => {
                            const filteredPosts = posts.filter((post) =>
                                following.includes(post.author)
                            );
                            return filteredPosts.length > 0 ? (
                                filteredPosts
                                    .map((post) => (
                                        <Post
                                            key={post._id}
                                            id={post._id}
                                            isLiked={
                                                likedPosts[post._id]?.isLiked
                                            }
                                            isSaved={savedPosts[post._id]}
                                            onClickLike={() =>
                                                handleLikePost(post)
                                            }
                                            onClickSave={() =>
                                                handleSavePost(post)
                                            }
                                            countLikes={
                                                likedPosts[post._id]?.countLikes
                                            }
                                        />
                                    ))
                                    .reverse()
                            ) : (
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        mt: 4,
                                        color: "#888",
                                    }}
                                >
                                    No content
                                </Box>
                            );
                        })()
                    ) : (
                        <Box sx={{ textAlign: "center", mt: 4, color: "#888" }}>
                            No content
                        </Box>
                    )}
                </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"} width={320}>
                <Box
                    sx={{
                        width: "100%",
                        ml: "64px",
                        mt: "36px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "relative",
                        top: "0",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "start" }}>
                        <Link to={`/${user.userName}`}>
                            <img
                                src={user.profilePicture}
                                alt=""
                                style={{
                                    width: 45,
                                    height: 45,
                                    marginRight: "12px",
                                    borderRadius: "50%",
                                }}
                            />
                        </Link>
                        <Box sx={{ fontSize: "14px" }}>
                            <Link to={`/${user.userName}`}>
                                <Box sx={{ fontWeight: 600 }}>
                                    {user.userName}
                                </Box>
                            </Link>
                            <Box sx={{ color: "#999" }}>{user.fullName}</Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#0095F6",
                            cursor: "pointer",
                        }}
                        onClick={() => setModalSwitch(true)}
                    >
                        Switch
                    </Box>
                </Box>
                <Suggestion />
                {modalSwitch && (
                    <SwitchAcccountModal
                        onClick={() => {
                            setModalSwitch(false);
                        }}
                    />
                )}
            </Box>
        </Box>
    ) : (
        ""
    );
}

export default Home;
