import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getMessage, sendMessage } from "../services/messageService";
import { getUserById } from "../services/userService";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Messages() {
    const { id } = useParams();
    const [conversations, setConversations] = useState(null);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const me = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const messages = await getMessage(id);
                setConversations(messages);

                const userData = await getUserById(id);
                setUser(userData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (user && me) {
            const roomId = [user._id, me._id].sort().join("-");
            socket.emit("join_chat", roomId);

            // Lắng nghe tin nhắn mới
            socket.on("receive_message", (newMessage) => {
                setConversations((prev) => [...prev, newMessage]);
            });
        }

        return () => {
            if (user && me) {
                const roomId = [user._id, me._id].sort().join("-");
                socket.emit("leave_chat", roomId);
                socket.off("receive_message");
            }
        };
    }, [user, me]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const messageData = {
            senderId: me._id,
            receiverId: user._id,
            message: message.trim(),
            roomId: [user._id, me._id].sort().join("-"),
            timestamp: new Date(),
        };

        // Gửi tin nhắn qua Socket.IO
        socket.emit("send_message", messageData);

        // Cập nhật UI ngay lập tức
        setConversations((prev) => [...prev, messageData]);
        setMessage("");

        // Lưu tin nhắn vào database
        try {
            await sendMessage(id, { message: message.trim() });
        } catch (error) {
            console.error("Error saving message:", error);
        }
    };

    return !conversations && !user ? (
        ""
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
                    position: "fixed",
                }}
            >
                {user && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={user.profilePicture}
                            alt=""
                            style={{
                                width: "44px",
                                borderRadius: "50%",
                                marginRight: "10px",
                            }}
                        />

                        <p style={{ fontWeight: "600" }}>{user.fullName}</p>
                    </Box>
                )}
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
                    m: "85px 0",
                    p: "0 20px 20px",
                    overflowY: "scroll",
                    height: "calc(100vh - 160px)",
                }}
            >
                {user && (
                    <Box
                        sx={{
                            alignSelf: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            m: "24px 0",
                        }}
                    >
                        <img
                            src={user.profilePicture}
                            alt=""
                            style={{ width: "96px", borderRadius: "50%" }}
                        />
                        <p
                            style={{
                                fontWeight: "600",
                                fontSize: "18px",
                                margin: "12px 0 0",
                            }}
                        >
                            {user.fullName}
                        </p>
                        <Box sx={{ color: "#737373", fontSize: "14px" }}>
                            {user.userName} · Instagram
                        </Box>
                        <Box
                            component={Link}
                            to={`/${user.userName}`}
                            sx={{
                                backgroundColor: "#efefef",
                                p: "4px 16px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                m: "20px 0",
                            }}
                        >
                            View Profile
                        </Box>
                    </Box>
                )}
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
