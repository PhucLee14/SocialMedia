import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getPostById, getPostByUserId } from "../../services/postService";
import PostPreview from "../../components/PostPreview";
import { getUserByUserName } from "../../services/userService";
import { useParams } from "react-router-dom";
import PostDetail from "../PostDetail";
import PostDetailModal from "../../components/Modal/PostDetailModal";

function Profile() {
    const param = useParams();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [detailPost, setDetailPost] = useState(null);
    const [displayDetailPost, setDisplayDetailPost] = useState(false);

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
    }, []);

    useEffect(() => {
        const getPost = async () => {
            try {
                const data = await getPostByUserId(user._id);
                setPosts(data);
            } catch (error) {
                console.log(error);
            }
        };
        getPost();
    }, [user]);

    const handleGetPost = async (postId) => {
        try {
            const data = await getPostById(postId);
            setDetailPost(data);
        } catch (error) {
            console.log(error);
        }
    };
    return posts.length > 0 ? (
        <>
            <Box sx={{ display: "flex", width: "940px" }}>
                {posts.map((post) => (
                    <PostPreview
                        post={post}
                        onClick={(e) => {
                            e.preventDefault();
                            handleGetPost(post._id);
                        }}
                        link={`/${user.userName}/${post._id}`}
                    />
                ))}
            </Box>
            {detailPost && (
                <PostDetailModal
                    onClick={() => {
                        setDisplayDetailPost(false);
                        setDetailPost(null);
                    }}
                    post={detailPost}
                >
                    <PostDetail post={detailPost} />
                </PostDetailModal>
            )}
        </>
    ) : (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    border: "2px solid black",
                    borderRadius: "50%",
                    padding: "20px 16px",
                    m: "52px 0 12px",
                }}
            >
                <i class="fa-light fa-camera fa-2xl"></i>
            </Box>
            <Box sx={{ fontWeight: "900", fontSize: "28px", m: "12px 0" }}>
                Share Photos
            </Box>
            <Box sx={{ fontSize: "14px" }}>
                When you share photos, they will appear on your profile.
            </Box>
        </Box>
    );
}

export default Profile;
