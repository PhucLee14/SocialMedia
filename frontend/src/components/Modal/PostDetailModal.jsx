import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getUserById, postLiked, postSaved } from "../../services/userService";
import { Link } from "react-router-dom";
import LikeEmotion from "../Action/LikeEmotion";
import SaveEmotion from "../Action/SaveEmotion";
import { likePost, savePost } from "../../services/postService";

function PostDetailModal({ post, onClick }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [author, setAuthor] = useState(null);
    const [likedPosts, setLikedPosts] = useState(null);
    const [savedPosts, setSavedPosts] = useState(null);
    useEffect(() => {
        const getAuthor = async () => {
            try {
                const data = await getUserById(post.author);
                setAuthor(data);
            } catch (error) {
                console.log(error);
            }
        };
        getAuthor();
    }, []);

    useEffect(() => {
        if (post) {
            const initialLikedPosts = post.likes.includes(user._id);
            setLikedPosts(initialLikedPosts);
        }
        if (post) {
            const initialSavedPosts = post.saves.includes(user._id);
            setSavedPosts(initialSavedPosts);
        }
    }, []);

    const handleLikePost = async (post) => {
        try {
            setLikedPosts((prev) => !prev);
            await likePost(post._id, user._id);
            await postLiked(user._id, post._id);
            console.log(post._id, user._id);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSavePost = async (post) => {
        try {
            setSavedPosts((prev) => !prev);
            await postSaved(user._id, post._id);
            await savePost(post._id, user._id);
        } catch (error) {
            console.log(error);
        }
    };

    console.log("likedPosts: ", likedPosts);
    console.log("savedPosts: ", savedPosts);

    return ReactDOM.createPortal(
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 100,
                }}
                onClick={onClick}
            ></Box>
            <Box
                sx={{
                    backgroundColor: "#fff",
                    zIndex: 101,
                    height: "90%",
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        maxWidth: "770px",
                        bgcolor: "#000",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {post.medias.map((media, index) => (
                        <img
                            key={index}
                            src={media}
                            alt={`Post media ${index}`}
                            style={{ width: "100%", maxHeight: "100%" }}
                        />
                    ))}
                </Box>
                {author ? (
                    <Box sx={{ width: "500px", height: "100%" }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: "16px",
                                gap: "16px",
                                borderBottom: "1px solid #eee",
                                width: "100%",
                            }}
                        >
                            <Box component={Link} to={`/${author.userName}`}>
                                <img
                                    src={author.profilePicture}
                                    alt=""
                                    style={{
                                        width: "32px",
                                        borderRadius: "50%",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{ fontWeight: "600", fontSize: "14px" }}
                                component={Link}
                                to={`/${author.userName}`}
                            >
                                {author.userName}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "calc(100% - 64px)",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "16px 16px 80px",
                                    gap: "16px",
                                    width: "100%",
                                }}
                            >
                                <Box
                                    component={Link}
                                    to={`/${author.userName}`}
                                >
                                    <img
                                        src={author.profilePicture}
                                        alt=""
                                        style={{
                                            width: "32px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{ fontWeight: "600", fontSize: "14px" }}
                                    component={Link}
                                    to={`/${author.userName}`}
                                >
                                    {author.userName}
                                    <span
                                        style={{
                                            fontWeight: "400",
                                            paddingLeft: "8px",
                                        }}
                                    >
                                        {post.content}
                                    </span>
                                </Box>
                            </Box>
                            <Box>
                                <Box
                                    sx={{
                                        p: "16px",
                                        borderTop: "1px solid #eee",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: "16px",
                                                alignItems: "center",
                                            }}
                                        >
                                            <LikeEmotion
                                                isLiked={likedPosts}
                                                onClick={() =>
                                                    handleLikePost(post)
                                                }
                                            />
                                            <i
                                                class="fa-regular fa-comment fa-flip-horizontal fa-xl"
                                                style={{ cursor: "pointer" }}
                                            ></i>
                                            <i
                                                class="fa-regular fa-paper-plane fa-xl"
                                                style={{ cursor: "pointer" }}
                                            ></i>
                                        </Box>
                                        <Box>
                                            <SaveEmotion
                                                isSaved={savedPosts}
                                                onClick={() =>
                                                    handleSavePost(post)
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            mt: "16px",
                                        }}
                                    >
                                        {post.likes.length > 0 && (
                                            <p>
                                                {post.likes.length}{" "}
                                                {post.likes.length === 1
                                                    ? "like"
                                                    : "likes"}
                                            </p>
                                        )}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "8px 16px",
                                        borderTop: "1px solid #eee",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            width: "100%",
                                        }}
                                    >
                                        <i class="fa-regular fa-face-smile fa-xl"></i>
                                        <form style={{ width: "100%" }}>
                                            <TextField
                                                placeholder="Message..."
                                                fullWidth
                                                sx={{
                                                    backgroundColor: "#fff",
                                                    borderRadius: 6,
                                                    "& fieldset": {
                                                        border: "none",
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        py: 1,
                                                    },
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline":
                                                        {
                                                            border: "none",
                                                        },
                                                }}
                                            />
                                        </form>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            color: "#0095f6",
                                            fontWeight: "600",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Post
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    ""
                )}
            </Box>
        </Box>,
        document.body
    );
}

export default PostDetailModal;
