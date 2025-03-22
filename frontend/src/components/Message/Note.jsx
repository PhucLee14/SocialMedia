import { Box } from "@mui/material";
import React from "react";

function Note({ img, note }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "78px",
            }}
        >
            <img
                src={img}
                style={{ width: "74px", borderRadius: "50%" }}
                alt=""
            />
            <p style={{ fontSize: "12px", color: "#737373" }}>
                {note ? note : "Your note"}
            </p>
        </Box>
    );
}

export default Note;
