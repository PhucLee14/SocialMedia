import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { getMessage, sendMessage } from "../services/messageService";
import { getUserById } from "../services/userService";

function Messages() {
    const { id } = useParams();
    const [conversations, setConversations] = useState(null);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
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

    const handleSendMessage = async (e) => {
        e.preventDefault();
        console.log(message);
        if (message != "") {
            try {
                const data = await sendMessage(id, { message });
                setMessage("");
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return !conversations && !user ? (
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
                    {user ? (
                        <img
                            src={user.profilePicture}
                            alt=""
                            style={{
                                width: "44px",
                                borderRadius: "50%",
                                marginRight: "10px",
                            }}
                        />
                    ) : (
                        ""
                    )}
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
                {conversations
                    ? conversations.map((conversation) =>
                          conversation.senderId == me._id ? (
                              <Box
                                  sx={{
                                      backgroundColor: "#0095e6",
                                      width: "fit-content",
                                      p: "7px 12px",
                                      borderRadius: "20px",
                                      color: "#fff",
                                      alignSelf: "flex-end",
                                  }}
                              >
                                  {conversation.message}
                              </Box>
                          ) : (
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
                          )
                      )
                    : ""}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "4px 20px",
                    margin: "10px 20px",
                    border: "1px solid #ccc",
                    borderRadius: "24px",
                    position: "fixed",
                    bottom: 0,
                    left: "400px",
                    right: 0,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        width: "100%",
                    }}
                >
                    <i class="fa-regular fa-face-smile fa-xl"></i>
                    <form
                        style={{ width: "100%" }}
                        onSubmit={handleSendMessage}
                    >
                        <TextField
                            placeholder="Message..."
                            fullWidth
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: 6,
                                "& fieldset": { border: "none" },
                                "& .MuiInputBase-input": {
                                    py: 1,
                                },
                                "&:focus-within .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: "none",
                                    },
                            }}
                        />
                    </form>
                </Box>
                <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                    <i class="fa-regular fa-microphone fa-xl"></i>
                    <i class="fa-regular fa-image fa-xl"></i>
                    <i class="fa-regular fa-note-sticky fa-xl"></i>
                    <i class="fa-regular fa-heart fa-xl"></i>
                </Box>
            </Box>
        </Box>
    );
}

export default Messages;
