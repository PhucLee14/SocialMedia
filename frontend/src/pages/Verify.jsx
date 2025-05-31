import React, { useState } from "react";
import { Box } from "@mui/material";
import AuthButton from "../components/Button/AuthButton";
import InputAuth from "../components/InputAuth";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyOtp } from "../services/authService";

function Verify() {
    const nav = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const email = query.get("email");

    const [otp, setOtp] = useState("");

    const handleSubmit = async () => {
        if (!otp) return toast.error("Please enter OTP");

        try {
            const data = { email, otp };
            const result = await verifyOtp(data);

            toast.success(result.message || "Verified successfully");
            nav("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid OTP");
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
                        Verify your account
                    </Box>
                    <Box textAlign={"center"} my={3} fontWeight={500}>
                        Input your OTP code.
                    </Box>
                    <InputAuth
                        placeholder={"Input OTP code"}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <AuthButton text={"SUBMIT"} onClick={handleSubmit} />
                </Box>
            </Box>
        </Box>
    );
}

export default Verify;
