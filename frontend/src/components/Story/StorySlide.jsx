import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import StoryPreview from "./StoryPreview";
import { getAllUsers, getUser } from "../../services/userService";

function StorySlide() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        fetchUsers();
    }, []);
    return (
        <Box display={"flex"} justifyContent={"start"} mt={2} gap={2}>
            {/* <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                sx={{ cursor: "pointer" }}
            >
                <Box
                    sx={{
                        backgroundColor: "#efefef",
                        padding: "2px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        width={"56px"}
                        height={"56px"}
                        borderRadius={"50%"}
                        backgroundColor={"#fff"}
                    >

                    </Box>
                </Box>
            </Box> */}
            {users.map((user) => (
                <StoryPreview key={user._id} user={user} />
            ))}
        </Box>
    );
}

export default StorySlide;
