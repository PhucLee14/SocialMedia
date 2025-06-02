import { Box } from "@mui/material";
import React from "react";

function StoryPreview({ user }) {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
        >
            <Box
                sx={{
                    background: "linear-gradient(45deg, #FFC800, #D300C5)",
                    padding: "2px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    src={user.profilePicture}
                    style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        border: "2px solid #fff",
                        background: "#fff",
                    }}
                    alt=""
                />
            </Box>
            <Box fontSize={"12px"}>{user.userName}</Box>
        </Box>
    );
}

export default StoryPreview;
