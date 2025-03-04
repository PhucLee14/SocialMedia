import { Box, LinearProgress } from "@mui/material";
import React from "react";

function LoadingProcess() {
    return (
        <Box
            sx={{
                width: "100vw",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
            }}
        >
            <LinearProgress
                sx={{
                    width: "100vw",
                    backgroundColor: "transparent",
                    "& .MuiLinearProgress-bar": {
                        background:
                            "linear-gradient(to right, #FFCB00, #7E04FE)",
                    },
                }}
            />
        </Box>
    );
}

export default LoadingProcess;
