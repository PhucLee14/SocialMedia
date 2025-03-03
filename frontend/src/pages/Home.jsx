import React, { useEffect, useState } from "react";
import SeachPopup from "../components/Popup/SearchPopup";
import { Box } from "@mui/material";
import { getUser } from "../services/userService";
import { Link } from "react-router-dom";

function Home() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser();
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, []);
    console.log(user);
    return user ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: 630, backgroundColor: "yellow" }}>Newfeeds</Box>
            <Box
                sx={{
                    width: 320,
                    pl: "64px",
                    mt: "36px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "start" }}>
                    <Link to={`/${user.userName}`}>
                        <img
                            src={user.profilePicture}
                            alt=""
                            style={{
                                width: 45,
                                height: 45,
                                marginRight: "12px",
                            }}
                        />
                    </Link>
                    <Box sx={{ fontSize: "14px" }}>
                        <Link to={`/${user.userName}`}>
                            <Box sx={{ fontWeight: 600 }}>{user.userName}</Box>
                        </Link>
                        <Box sx={{ color: "#999" }}>{user.fullName}</Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#0095F6",
                        cursor: "pointer",
                    }}
                >
                    Switch
                </Box>
            </Box>
        </Box>
    ) : (
        ""
    );
}

export default Home;
