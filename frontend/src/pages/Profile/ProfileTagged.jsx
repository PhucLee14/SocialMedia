import { Box } from "@mui/material";
import React from "react";

function ProfileTagged() {
    return (
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
                    padding: "20px 18px",
                    m: "52px 0 12px",
                }}
            >
                <i class="fa-light fa-image-polaroid-user fa-2xl"></i>
            </Box>
            <Box sx={{ fontWeight: "900", fontSize: "28px", m: "12px 0" }}>
                Photos of you
            </Box>
            <Box sx={{ fontSize: "14px" }}>
                When people tag you in photos, they'll appear here.
            </Box>
        </Box>
    );
}

export default ProfileTagged;
