import React, { useState } from "react";
import { Box } from "@mui/material";
import AuthButton from "../components/Button/AuthButton";
import InputAuth from "../components/InputAuth";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import LoadingDetail from "../components/Loading/LoadingDetail";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const handleSendEmail = async () => {
    try {
      setLoading(true);
      const data = email;
      const result = await forgotPassword({ email: data });
      setLoading(false);
      nav("/forgotpassword/success");
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
          <Box textAlign={"center"} fontSize={"22px"} fontWeight={700}>
            Forgot Password
          </Box>
          <Box textAlign={"center"} my={3} fontWeight={500}>
            We will send you instructions on how to reset your password by
            email.
          </Box>
          <InputAuth
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Email"}
          />
          <AuthButton text={"SUBMIT"} onClick={handleSendEmail} />
        </Box>
      </Box>
      {loading && (
        <Box>
          <LoadingDetail />
        </Box>
      )}
    </Box>
  );
}

export default ForgotPassword;
