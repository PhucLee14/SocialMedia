import { Box } from "@mui/material";
import React from "react";

function CommentEmotion() {
    return (
        <Box>
            <i
                class="fa-regular fa-comment fa-flip-horizontal fa-xl"
                style={{ cursor: "pointer" }}
            ></i>
        </Box>
    );
}

export default CommentEmotion;
