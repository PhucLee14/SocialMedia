import { Box } from "@mui/material";
import React from "react";

function MessageEmpty() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "calc(100% - 400px)",
            }}
        >
            <Box
                sx={{
                    padding: "34px 30px",
                    border: "2px solid #000",
                    borderRadius: "50%",
                }}
            >
                <i class="fa-brands fa-facebook-messenger fa-2xl"></i>
            </Box>
            <Box
                sx={{
                    fontSize: "22px",
                }}
            >
                Your messages
            </Box>
            <Box sx={{ color: "#737373", mt: "16px" }}>
                Send a message to start a chat.
            </Box>
            <Box
                sx={{
                    backgroundColor: "#0095f6",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "10px",
                    mt: "16px",
                }}
            >
                Send message
            </Box>
        </Box>
    );
}

export default MessageEmpty;
