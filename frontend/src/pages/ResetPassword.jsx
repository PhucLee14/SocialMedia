import React, { useState } from "react";
import { Box } from "@mui/material";
import AuthButton from "../components/Button/AuthButton";
import InputAuth from "../components/InputAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/authService";

function ResetPassword() {
    const { token } = useParams();
    const nav = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            return;
        }
        try {
            const data = { newPassword };
            const result = await resetPassword(token, data);
            console.log("result: ", result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Box
                position={"fixed"}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                width="100vw"
                height="80px"
                bgcolor={"#1976d2"}
            >
                <Box color="#fff" fontWeight={700} fontSize="24px">
                    Onstagram
                </Box>
                <Box display="flex" gap={1}>
                    <Link
                        to="/login"
                        style={{
                            padding: "0.5rem 1rem",
                            fontSize: "0.875rem",
                            fontWeight: "bold",
                            color: "#0B3E71",
                            borderBottom: "4px solid #8ED8FB",
                            borderRadius: "16px",
                            backgroundColor: "white",
                        }}
                    >
                        LOGIN
                    </Link>
                    <Link
                        to="/register"
                        style={{
                            padding: "0.5rem 1rem",
                            fontSize: "0.875rem",
                            fontWeight: "bold",
                            color: "#0B3E71",
                            borderBottom: "4px solid #8ED8FB",
                            borderRadius: "16px",
                            backgroundColor: "white",
                        }}
                    >
                        SIGN UP
                    </Link>
                </Box>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent={"center"}
                height="100vh"
            >
                <Box width="360px" color={"#4B4B4B"}>
                    <Box
                        textAlign={"center"}
                        fontSize={"22px"}
                        fontWeight={700}
                    >
                        Reset Password
                    </Box>
                    <Box textAlign={"center"} my={3} fontWeight={500}>
                        Input your code to reset your password.
                    </Box>
                    <InputAuth
                        placeholder={"Password"}
                        type={"password"}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputAuth
                        placeholder={"Confirm password"}
                        type={"password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPassword == "" ? (
                        ""
                    ) : (
                        <Box
                            fontSize={"12px"}
                            color={"#FF0000"}
                            mt={-1}
                            display={
                                newPassword !== confirmPassword
                                    ? "block"
                                    : "none"
                            }
                        >
                            Your confirm password isn't fit with your password
                        </Box>
                    )}
                    <AuthButton text={"SUBMIT"} onClick={handleResetPassword} />
                </Box>
            </Box>
        </Box>
    );
}

export default ResetPassword;
