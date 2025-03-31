import React, { useEffect, useState } from "react";
import SeachPopup from "../components/Popup/SearchPopup";
import { Box } from "@mui/material";
import { getUser, postLiked, postSaved } from "../services/userService";
import { Link } from "react-router-dom";
import { getPosts, likePost, savePost } from "../services/postService";
import Post from "../components/Post";

function Home() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [likedPosts, setLikedPosts] = useState({});
    const [savedPosts, setSavedPosts] = useState({});

    //Get post
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch post:", error);
            }
        };

        fetchPost();
    }, []);

    //Get user
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

    useEffect(() => {
        if (posts && user) {
            const initialLikedPosts = posts.reduce((acc, post) => {
                acc[post._id] = post.likes.includes(user._id);
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
            await likePost(post._id, user._id);
            await postLiked(user._id, post._id);
            setLikedPosts((prev) => ({
                ...prev,
                [post._id]: !prev[post._id],
            }));
            console.log(post._id, user._id);
        } catch (error) {
            setLikedPosts((prev) => ({
                ...prev,
                [post._id]: prev[post._id],
            }));
            console.log(error);
        }
    };

    const handleSavePost = async (post) => {
        try {
            await postSaved(user._id, post._id);
            await savePost(post._id, user._id);
            setSavedPosts((prev) => ({
                ...prev,
                [post._id]: !prev[post._id],
            }));
        } catch (error) {
            setSavedPosts((prev) => ({
                ...prev,
                [post._id]: prev[post._id],
            }));
            console.log(error);
        }
    };

    console.log(user);
    console.log(posts);
    return user ? (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
            }}
        >
            <Box sx={{ width: 630 }}>
                {posts
                    ? posts.map((post) => (
                          <Post
                              key={post._id}
                              id={post._id}
                              isLiked={likedPosts[post._id]}
                              isSaved={savedPosts[post._id]}
                              onClickLike={() => handleLikePost(post)}
                              onClickSave={() => handleSavePost(post)}
                          />
                      ))
                    : ""}
            </Box>
            <Box
                sx={{
                    width: 320,
                    pl: "64px",
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
                            <Box sx={{ fontWeight: 600 }}>{user.userName}</Box>
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
                >
                    Switch
                </Box>
            </Box>
        </Box>
    ) : (
        ""
    );
}

export default Home;
