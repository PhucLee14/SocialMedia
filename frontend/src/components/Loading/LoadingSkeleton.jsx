import { Box, Skeleton } from "@mui/material";
import React from "react";

function LoadingSkeleton() {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    m: "20px",
                }}
            >
                <Skeleton variant="circular" width={56} height={56} />
                <Skeleton variant="rectangular" width={300} height={56} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    m: "12px 20px",
                }}
            >
                <Skeleton variant="circular" width={56} height={56} />
                <Skeleton variant="rectangular" width={300} height={56} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    m: "20px",
                }}
            >
                <Skeleton variant="circular" width={56} height={56} />
                <Skeleton variant="rectangular" width={300} height={56} />
            </Box>
        </Box>
    );
}

export default LoadingSkeleton;
