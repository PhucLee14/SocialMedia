import React, { useEffect, useState } from "react";
import SeachPopup from "../components/Popup/SearchPopup";
import { Box } from "@mui/material";
import { getUser } from "../services/userService";
import { Link } from "react-router-dom";
import { getPosts } from "../services/postService";
import Post from "../components/Post";

function Home() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);

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
                    ? posts.map((post) => <Post key={post._id} id={post._id} />)
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
