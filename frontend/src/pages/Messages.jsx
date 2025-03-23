import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { getMessage } from "../services/messageService";
import { getUserById } from "../services/userService";

function Messages() {
    const { id } = useParams();
    const [conversations, setConversations] = useState(null);
    const [user, setUser] = useState(null);
    const me = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const getConversations = async () => {
            try {
                const data = await getMessage(id);
                setConversations(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        const getUser = async () => {
            try {
                const data = await getUserById(id);
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        };
        getConversations();
        getUser();
    }, [id]);

    console.log("id: ", id);
    console.log("conversations: ", conversations);
    return !conversations ? (
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
    ) : (
        <Box sx={{ width: "calc(100% - 40px)" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: "20px 16px",
                    borderBottom: "1px solid #ccc",
                    width: "100%",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={user.profilePicture}
                        alt=""
                        style={{ width: "44px", borderRadius: "50%" }}
                    />
                    <p style={{ fontWeight: "600" }}>{user.fullName}</p>
                </Box>
                <Box sx={{ display: "flex", gap: "16px" }}>
                    <i class="fa-regular fa-phone fa-xl"></i>
                    <i class="fa-regular fa-video fa-xl"></i>
                    <i class="fa-regular fa-circle-info fa-xl"></i>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                    m: "20px",
                }}
            >
                {conversations.map((conversation) => (
                    <Box
                        sx={{
                            backgroundColor: "#efefef",
                            width: "fit-content",
                            p: "7px 12px",
                            borderRadius: "20px",
                        }}
                    >
                        {conversation.message}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default Messages;
