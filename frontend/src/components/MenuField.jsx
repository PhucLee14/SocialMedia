import { Box } from "@mui/material";
import React from "react";

function MenuField({ text, isRed, ...props }) {
    return (
        <Box
            width={"100%"}
            textAlign={"center"}
            fontSize={"14px"}
            fontWeight={"600"}
            color={"red"}
            p={"12px 0"}
            borderBottom={"1px solid #ccc"}
            sx={{
                color: isRed ? "red" : "black",
                fontWeight: isRed ? "600" : "400",
                cursor: "pointer",
            }}
            {...props}
        >
            {text}
        </Box>
    );
}

export default MenuField;
