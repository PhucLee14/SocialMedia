import { Box } from "@mui/material";
import React from "react";

function ProfileSaved() {
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
                    padding: "20px 20px",
                    m: "52px 0 12px",
                }}
            >
                <i class="fa-light fa-bookmark fa-2xl"></i>
            </Box>
            <Box sx={{ fontWeight: "900", fontSize: "28px", m: "12px 0" }}>
                Saved Post
            </Box>
            <Box sx={{ fontSize: "14px" }}>
                When you share photos, they will appear on your profile.
            </Box>
        </Box>
    );
}

export default ProfileSaved;
