import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Note from "../components/Message/Note";
import MessageTag from "../components/Message/MessageTag";
import { getUserById, getUserForSideBar } from "../services/userService";
import LoadingSkeleton from "../components/Loading/LoadingSkeleton";
import LayoutIcon from "./LayoutIcon";

function MessageLayout({ children }) {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(null);
    const [userMessages, setUserMessages] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await getUserById(userInfo._id);
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        };
        const getMessagesInfo = async () => {
            const data = await getUserForSideBar();
            setUserMessages(data);
            console.log(data);
        };
        getUser();
        getMessagesInfo();
    }, []);
    console.log(userMessages);
    return (
        <Box>
            <LayoutIcon>
                <Box
                    sx={{
                        display: "flex",
                        width: "calc(100vw - 72px)",
                        height: "100vh",
                    }}
                >
                    <Box
                        sx={{
                            width: "400px",
                            height: "100vh",
                            borderRight: "1px solid #ccc",
                        }}
                    >
                        {user && (
                            <Box sx={{ margin: "40px 20px 20px" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: "40px",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        {user.userName}
                                    </p>
                                    <i class="fa-regular fa-pen-to-square fa-xl"></i>
                                </Box>
                                <Box>
                                    <Note img={user.profilePicture} />
                                </Box>
                            </Box>
                        )}
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
                            {userMessages ? (
                                userMessages.map((user) => (
                                    <MessageTag
                                        img={user.profilePicture}
                                        name={user.fullName}
                                        link={`/messages/${user._id}`}
                                    />
                                ))
                            ) : (
                                <LoadingSkeleton />
                            )}
                        </Box>
                    </Box>
                    {children}
                </Box>
            </LayoutIcon>
        </Box>
    );
}

export default MessageLayout;
