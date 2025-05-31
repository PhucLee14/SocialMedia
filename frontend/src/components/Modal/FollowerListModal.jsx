import React from "react";
import ReactDOM from "react-dom";
import { Box } from "@mui/material";
import Search from "../Search";
import UserFollowTag from "../Tag/UserFollowTag";

function FollowerListModal({ user, onClick, followerList }) {
    console.log("FollowerListModal", user, followerList);
    return ReactDOM.createPortal(
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 100,
                }}
                onClick={onClick}
            ></Box>
            <Box
                backgroundColor={"#fff"}
                zIndex={"101"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"400px"}
                borderRadius={"16px"}
            >
                <Box
                    display={"flex"}
                    width={"100%"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    padding={"8px"}
                    borderBottom={"1px solid #ddd"}
                    mb={"8px"}
                >
                    <Box></Box>
                    <Box fontWeight={"700"}>Follower</Box>
                    <Box>
                        <i class="fa-solid fa-xmark-large"></i>
                    </Box>
                </Box>
                <Search />
                {followerList.length > 0 ? (
                    <Box
                        sx={{
                            width: "100%",
                            maxHeight: "400px",
                            overflowY: "auto",
                            my: "8px",
                        }}
                    >
                        {followerList.map((user) => (
                            <Box
                                key={user._id}
                                sx={{
                                    padding: "8px 16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <UserFollowTag userId={user} />
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Box padding={"16px"}>No follower found.</Box>
                )}
            </Box>
        </Box>,
        document.body
    );
}

export default FollowerListModal;
