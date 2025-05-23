import { Box } from "@mui/material";
import React from "react";

function SuccessIcon() {
    return (
        <Box padding={1} bgcolor={"#21BE79"} borderRadius={"50%"}>
            <Box
                padding={6}
                bgcolor={"#fff"}
                borderRadius={"50%"}
                position={"relative"}
            >
                <Box
                    padding={"0.25rem 0.75rem"}
                    bgcolor={"#21BE79"}
                    position={"absolute"}
                    bottom={"15%"}
                    sx={{
                        transform: "rotate(45deg) translateX(-135%)",
                    }}
                ></Box>
                <Box
                    padding={"0.25rem 1.5rem"}
                    bgcolor={"#21BE79"}
                    position={"absolute"}
                    top={"30%"}
                    sx={{
                        transform: "rotate(-45deg) translateX(-42%)",
                    }}
                ></Box>
            </Box>
        </Box>
    );
}

export default SuccessIcon;
