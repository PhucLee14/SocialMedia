import { Box } from "@mui/material";
import React from "react";
import { extractTime } from "../utils/extractTime";
import { extractTimeShort } from "../utils/extractTimeShort";

function Time({ time, isShort }) {
    return (
        <Box sx={{ fontSize: "12px", color: "#737373" }}>
            {isShort ? extractTimeShort(time) : extractTime(time)}
        </Box>
    );
}

export default Time;
