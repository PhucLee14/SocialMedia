import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function UserTag({ user }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 24px",
                "&:hover": { backgroundColor: "#eee" },
                cursor: "pointer",
            }}
            component={Link}
            to={`/${user.userName}`}
        >
            <Box sx={{ marginRight: "16px" }}>
                <img
                    src={user.profilePicture}
                    alt=""
                    style={{ width: "44px", borderRadius: "50%" }}
                />
            </Box>
            <Box>
                <Box sx={{ fontWeight: "600", fontSize: "14px" }}>
                    {user.userName}
                </Box>
                <Box sx={{ fontSize: "14px", color: "#737373" }}>
                    {user.fullName}
                </Box>
            </Box>
        </Box>
    );
}

export default UserTag;
