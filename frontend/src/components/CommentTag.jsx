import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserById } from "../services/userService";
import { Link } from "react-router-dom";
import { extractTime } from "../utils/extractTime";
import Time from "./Time";

function CommentTag({ comment }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await getUserById(comment.userId);
                setUser(data);
            } catch (error) {}
        };
        getUser();
    });
    return user ? (
        <Box>
            <Box
                component={Link}
                to={`/${user.userName}`}
                sx={{
                    display: "flex",
                    gap: "16px",
                    marginBottom: "10px",
                    p: "16px",
                }}
            >
                <img
                    style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                    }}
                    src={user.profilePicture}
                    alt=""
                />
                <Box sx={{}}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <Box sx={{ fontSize: "14px", fontWeight: "600" }}>
                            {user.userName}
                        </Box>
                        <Box>{comment.content}</Box>
                    </Box>
                    <Box>
                        <Time time={comment.createdAt} isShort={true} />
                    </Box>
                </Box>
            </Box>
        </Box>
    ) : (
        ""
    );
}

export default CommentTag;
