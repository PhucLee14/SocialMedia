import React from "react";
import { Box, CircularProgress } from "@mui/material";

function LoadingDetail() {
    return (
        <Box
            position="fixed"
            top={0}
            width={"100vw"}
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor="rgba(0, 0, 0, 0.7)"
            // opacity={0.9}
        >
            <CircularProgress />
        </Box>
    );
}

export default LoadingDetail;
