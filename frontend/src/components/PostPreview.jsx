import { Box } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function PostPreview({ post, onClick, link }) {
    const [display, setDisplay] = useState(false);
    return (
        <Box sx={{ width: "calc(100% / 3)", position: "relative" }}>
            <Box
                sx={{
                    width: "98%",
                    height: "410px",
                    background: `url(${post.medias[0]})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    cursor: "pointer",
                    marginBottom: "6px",
                }}
                onMouseEnter={() => setDisplay(true)}
                onMouseLeave={() => setDisplay(false)}
            ></Box>
            <Box
                sx={{
                    position: "absolute",
                    top: "0",
                    background: "rgba(0,0,0,0.3)",
                    width: "98%",
                    height: "410px",
                    display: display ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    cursor: "pointer",
                    gap: "8px",
                    fontWeight: "600",
                    marginBottom: "6px",
                }}
                onMouseEnter={() => setDisplay(true)}
                onMouseLeave={() => setDisplay(false)}
                onClick={onClick}
                component={Link}
                to={link}
            >
                <Box>
                    <i class="fa-solid fa-heart"></i> {post.likes.length}
                </Box>
                <Box>
                    <i class="fa-solid fa-comment fa-flip-horizontal"></i>{" "}
                    {post.comments.length}
                </Box>
            </Box>
        </Box>
    );
}

export default PostPreview;
