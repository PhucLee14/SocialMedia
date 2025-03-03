import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

function CreatePostModal({ onClick }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh",
                position: "absolute",
                top: 0,
                left: 0,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 100,
                }}
                onClick={onClick}
            ></Box>

            <Box
                sx={{
                    backgroundColor: "white",
                    width: 600,
                    height: "80vh",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 101,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        textAlign: "center",
                        py: 2,
                        fontWeight: "bold",
                        borderBottom: "1px solid gray",
                    }}
                >
                    Create new post
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <ImageOutlinedIcon sx={{ fontSize: 80, color: "gray" }} />
                    <Typography variant="h6" sx={{ my: 2 }}>
                        Drag photos and videos here
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            px: 3,
                            py: 1,
                            textTransform: "none",
                            borderRadius: 2,
                            backgroundColor: "#2196f3",
                        }}
                    >
                        Select from computer
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default CreatePostModal;
