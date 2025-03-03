import React from "react";
import { Box, Paper, TextField, Typography, Divider } from "@mui/material";

function SearchPopup() {
    return (
        <Paper
            elevation={4}
            sx={{
                position: "absolute",
                top: 0,
                minWidth: 350,
                height: "100vh",
                zIndex: 40,
                borderRadius: 2,
                boxShadow: "8px 0 8px rgba(0,0,0,0.1)",
                animation: "fade-right 0.4s ease-in-out",
            }}
        >
            <Box px={4}>
                <Typography variant="h5" fontWeight="bold" py={3}>
                    Search
                </Typography>
                <TextField
                    fullWidth
                    placeholder="Search..."
                    variant="outlined"
                    sx={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: 2,
                        my: 2,
                        "& fieldset": { border: "none" },
                        "& .MuiInputBase-input": {
                            py: 1,
                        },
                        "&:focus-within .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                    }}
                />
            </Box>
            <Divider />
        </Paper>
    );
}

export default SearchPopup;
