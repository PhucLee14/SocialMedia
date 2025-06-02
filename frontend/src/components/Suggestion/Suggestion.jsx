import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SuggestionUserTag from "./SuggestionUserTag";
import { getAllUsers, getUserById } from "../../services/userService";

function Suggestion() {
    const me = JSON.parse(localStorage.getItem("user"));
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        const fetchFollowing = async () => {
            try {
                const data = await getUserById(me._id);
                setFollowing(data.following);
            } catch (error) {
                console.error("Failed to fetch following:", error);
            }
        };
        fetchUsers();
        fetchFollowing();
    }, []);

    return (
        users && (
            <Box width={"100%"} ml={"64px"} mt={"24px"}>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mb={2}
                >
                    <Box fontSize={"14px"} fontWeight={"500"} color={"#737373"}>
                        Suggested for you
                    </Box>
                    <Box
                        component={Link}
                        sx={{
                            fontSize: "12px",
                            fontWeight: 600,
                            textDecoration: "none",
                            "&:hover": {
                                opacity: 0.6,
                            },
                        }}
                    >
                        See All
                    </Box>
                </Box>
                <Box>
                    {users
                        .filter(
                            (user) =>
                                user._id !== me._id &&
                                !following.includes(user._id)
                        )
                        .map((user) => (
                            <SuggestionUserTag key={user._id} user={user} />
                        ))}
                </Box>
                <Box
                    display={"flex"}
                    flexWrap={"wrap"}
                    color={"#ccc"}
                    fontSize={"12px"}
                    width={"100%"}
                    gap={0.5}
                >
                    <Box
                        component={Link}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        About
                    </Box>
                    •
                    <Box
                        component={Link}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Help
                    </Box>
                    •
                    <Box
                        component={Link}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Press
                    </Box>
                    •
                    <Box
                        component={Link}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        API
                    </Box>
                    •
                    <Box
                        component={Link}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Jobs
                    </Box>
                    •
                    <Box
                        component={Link}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Privacy
                    </Box>
                    •
                    <Box
                        component={Link}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Terms
                    </Box>
                    •
                    <Box
                        component={Link}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Locations
                    </Box>
                    •
                    <Box
                        component={Link}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Language
                    </Box>
                    •
                    <Box
                        component={Link}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Meta Verified
                    </Box>
                </Box>
                <Box
                    fontSize={"12px"}
                    color={"#ccc"}
                    textTransform={"uppercase"}
                    mt={2}
                >
                    © 2025 Instagram from Meta
                </Box>
            </Box>
        )
    );
}

export default Suggestion;
