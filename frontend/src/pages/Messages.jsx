import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Note from "../components/Message/Note";
import MessageTag from "../components/Message/MessageTag";

function Messages() {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [userMessages, setUserMessages] = useState(null);

    useEffect(() => {
        const getMessagesInfo = async () => {
            // const data = await getMe
        };
    }, []);
    return (
        <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
            <Box sx={{ width: "400px", borderRight: "1px solid #ccc" }}>
                <Box sx={{ margin: "40px 20px 20px" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: "40px",
                        }}
                    >
                        <p style={{ fontSize: "20px", fontWeight: "700" }}>
                            {userInfo.userName}
                        </p>
                        <i class="fa-regular fa-pen-to-square fa-xl"></i>
                    </Box>
                    <Box>
                        <Note img={userInfo.profilePicture} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "0 20px 10px",
                    }}
                >
                    <p style={{ fontWeight: "700" }}>Messages</p>
                    <p
                        style={{
                            fontWeight: "600",
                            color: "#737373",
                            fontSize: "14px",
                        }}
                    >
                        Requests{" "}
                    </p>
                </Box>
                <Box>
                    <MessageTag />
                    <MessageTag />
                    <MessageTag />
                    <MessageTag />
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "calc(100% - 400px)",
                }}
            >
                <Box
                    sx={{
                        padding: "34px 30px",
                        border: "2px solid #000",
                        borderRadius: "50%",
                    }}
                >
                    <i class="fa-brands fa-facebook-messenger fa-2xl"></i>
                </Box>
                <Box
                    sx={{
                        fontSize: "22px",
                    }}
                >
                    Your messages
                </Box>
                <Box sx={{ color: "#737373", mt: "16px" }}>
                    Send a message to start a chat.
                </Box>
                <Box
                    sx={{
                        backgroundColor: "#0095f6",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: "10px",
                        mt: "16px",
                    }}
                >
                    Send message
                </Box>
            </Box>
        </Box>
    );
}

export default Messages;
