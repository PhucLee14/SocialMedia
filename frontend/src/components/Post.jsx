import React, { useEffect, useState } from "react";
import { getPost } from "../services/postService";
import { getUserById } from "../services/userService";
import { Box, Input } from "@mui/material";
import { Link } from "react-router-dom";
import LoadingProcess from "./Loading/LoadingProcess";

function Post({ id }) {
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Get post
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPost(id);
                setPost(data);
            } catch (error) {
                console.error("Failed to fetch post:", error);
            }
        };
        fetchPost();
    }, [id]);

    //Get user
    useEffect(() => {
        if (post && post.author) {
            const fetchUser = async () => {
                try {
                    setLoading(true);
                    const data = await getUserById(post.author);
                    setUser(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [post]);

    return loading ? (
        <LoadingProcess />
    ) : user ? (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: 468,
                    mt: "36px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    top: "0",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        mb: "12px",
                    }}
                >
                    <Link to={`/${user.userName}`}>
                        <img
                            src={user.profilePicture}
                            alt=""
                            style={{
                                width: 32,
                                height: 32,
                                marginRight: "12px",
                                borderRadius: "50%",
                            }}
                        />
                    </Link>
                    <Box sx={{ fontSize: "14px" }}>
                        <Link to={`/${user.userName}`}>
                            <Box sx={{ fontWeight: 600 }}>{user.userName}</Box>
                        </Link>
                    </Box>
                </Box>
                <Box
                    sx={{
                        fontSize: "16px",
                        cursor: "pointer",
                        mr: "4px",
                    }}
                >
                    <i class="fa-solid fa-ellipsis-vertical fa-rotate-90"></i>
                </Box>
            </Box>
            <Box sx={{}}>
                {post.medias.map((media) => (
                    <Box
                        sx={{
                            backgroundColor: "#000",
                            width: "468px",
                            height: "585px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            style={{
                                //   width: "468px",
                                height: "100%",
                            }}
                            src={media}
                        />
                    </Box>
                ))}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "468px",
                    mt: "12px",
                }}
            >
                <Box
                    sx={{ display: "flex", gap: "16px", alignItems: "center" }}
                >
                    <i class="fa-regular fa-heart fa-xl"></i>
                    <i class="fa-regular fa-comment fa-flip-horizontal fa-xl"></i>
                    <i class="fa-regular fa-paper-plane fa-xl"></i>
                </Box>
                <Box>
                    <i class="fa-regular fa-bookmark fa-xl"></i>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    width: "468px",
                    mt: "12px",
                }}
            >
                {post.content ? (
                    <Box sx={{ display: "flex", gap: "8px" }}>
                        <Link to={`/${user.userName}`}>
                            <Box sx={{ fontWeight: 600 }}>{user.userName}</Box>
                        </Link>
                        <Box>{post.content}</Box>
                    </Box>
                ) : (
                    ""
                )}
            </Box>
            <Box
                sx={{
                    width: "468px",
                    mt: "12px",
                    borderBottom: "1px solid #999",
                    pb: "24px",
                }}
            >
                <Input
                    placeholder="Add a comment"
                    disableUnderline
                    sx={{
                        border: "none",
                        width: "100%",
                        fontSize: "12px",
                    }}
                ></Input>
            </Box>
        </Box>
    ) : (
        ""
    );
}

export default Post;
