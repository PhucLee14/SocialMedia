import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SuccessIcon from "../components/SuccessIcon";

function SendMailSuccess() {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}
            width={"100vw"}
        >
            <SuccessIcon />
            <Box fontSize={"24px"} fontWeight={"600"} mt={2}>
                Success
            </Box>
            <Box color={"#6a7282"} fontWeight={"500"} fontSize={"16px"} my={2}>
                Check your email and reset your password.
            </Box>
            <Link
                to="/login"
                className="bg-blue-500 text-white py-3 px-30 font-semibold rounded-2xl cursor-pointer mt-4 border-b-6 border-b-blue-600  hover:bg-blue-400 hover:border-b-blue-500"
            >
                CONTINUE
            </Link>
        </Box>
    );
}

export default SendMailSuccess;
