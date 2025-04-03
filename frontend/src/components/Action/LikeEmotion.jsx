import { Box } from "@mui/material";
import React from "react";

function LikeEmotion({ isLiked, onClick }) {
    return (
        <Box>
            <i
                className={`fa-${isLiked ? "solid" : "regular"} fa-heart fa-xl`}
                style={{
                    cursor: "pointer",
                    ...(isLiked && { color: "#ff3040" }),
                }}
                onClick={onClick}
            />
        </Box>
    );
}

export default LikeEmotion;
