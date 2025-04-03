import { Box } from "@mui/material";
import React from "react";

function SaveEmotion({ isSaved, onClick }) {
    return (
        <Box>
            <i
                className={`fa-${
                    isSaved ? "solid" : "regular"
                } fa-bookmark fa-xl`}
                style={{ cursor: "pointer" }}
                onClick={onClick}
            ></i>
        </Box>
    );
}

export default SaveEmotion;
