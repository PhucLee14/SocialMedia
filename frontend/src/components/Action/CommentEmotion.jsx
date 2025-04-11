import { Box } from "@mui/material";
import React from "react";

function CommentEmotion({ onClick }) {
    return (
        <Box onClick={onClick}>
            <i
                class="fa-regular fa-comment fa-flip-horizontal fa-xl"
                style={{ cursor: "pointer" }}
            ></i>
        </Box>
    );
}

export default CommentEmotion;
