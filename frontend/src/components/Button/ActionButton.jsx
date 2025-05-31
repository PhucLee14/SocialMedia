import { Box } from "@mui/material";
import React from "react";

function ActionButton({ text, onClick, active }) {
    return (
        <Box
            sx={{
                borderRadius: "0.5rem",
                padding: "7px 16px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
            }}
            color={active ? "#000" : "#fff"}
            bgcolor={active ? "#efefef" : "#0095e7"}
            onClick={onClick}
        >
            {text}
        </Box>
    );
}

export default ActionButton;
