import { Box } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

function SwitchAcccountModal({ onClick }) {
    const me = JSON.parse(localStorage.getItem("user"));
    const nav = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("user");
            // setUser(null);
            nav("/login");
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };
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
                    <Box fontWeight={"700"}>Switch accounts</Box>
                    <Box>
                        <i class="fa-solid fa-xmark-large"></i>
                    </Box>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                    px={"16px"}
                    pb={"80px"}
                    borderBottom={"1px solid #ddd"}
                >
                    <Box display={"flex"} alignItems="center" gap={2}>
                        <img
                            src={me.profilePicture}
                            alt=""
                            style={{ borderRadius: "50%", width: "56px" }}
                        />
                        <Box fontSize={"14px"} fontWeight={"500"}>
                            {me.userName}
                        </Box>
                    </Box>
                    <Box>
                        <i class="fa-solid fa-circle-check fa-xl"></i>
                    </Box>
                </Box>
                <Box
                    fontSize={"14px"}
                    fontWeight={"500"}
                    color={"#0095f6"}
                    my={2}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            color: "#00376B",
                        },
                    }}
                    onClick={handleLogout}
                >
                    Login into an existing account
                </Box>
            </Box>
        </Box>,
        document.body
    );
}

export default SwitchAcccountModal;
