import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserById } from "../services/userService";

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
    return <Box>aaaaaa</Box>;
}

export default CommentTag;
