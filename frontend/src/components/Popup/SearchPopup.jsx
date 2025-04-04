import React, { useEffect, useState } from "react";
import { Box, Paper, TextField, Typography, Divider } from "@mui/material";
import { searchUsers } from "../../services/userService";
import LoadingSkeleton from "../Loading/LoadingSkeleton";
import UserTag from "../UserTag";

function SearchPopup() {
    const [keyword, setKeyword] = useState("");
    const [users, setUsers] = useState([]);
    const [skeleton, setSkeleton] = useState(true);
    useEffect(() => {
        const getKeyword = async () => {
            try {
                const data = await searchUsers(keyword);
                setUsers(data);
                setSkeleton(false);
            } catch (error) {
                console.log(error);
            }
        };
        getKeyword();
    }, [keyword]);
    console.log(users);
    return (
        <Paper
            elevation={4}
            sx={{
                position: "absolute",
                top: 0,
                minWidth: 350,
                height: "100vh",
                zIndex: 90,
                borderRadius: 2,
                boxShadow: "8px 0 8px rgba(0,0,0,0.1)",
                animation: "fade-right 0.4s ease-in-out",
            }}
        >
            <Box px={2}>
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
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </Box>
            <Divider />
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 24px",
                    }}
                >
                    <Box sx={{ fontWeight: "600" }}>Recent</Box>
                    <Box
                        sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#0095e7",
                        }}
                    >
                        Clean all
                    </Box>
                </Box>
                {users && !skeleton ? (
                    users.length > 0 ? (
                        users.map((user) => (
                            <Box key={user.id}>
                                <UserTag user={user} />
                            </Box>
                        ))
                    ) : (
                        ""
                    )
                ) : (
                    <LoadingSkeleton />
                )}
            </Box>
        </Paper>
    );
}

export default SearchPopup;
