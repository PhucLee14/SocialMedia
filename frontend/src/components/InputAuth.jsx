import { Input } from "@mui/material";
import React from "react";

function InputAuth({ type, placeholder, onChange }) {
    return (
        <Input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            disableUnderline
            sx={{
                py: 1,
                px: 1.5,
                width: "100%",
                border: "1px solid #dbdbdb",
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                fontSize: "0.875rem",
                marginBottom: 1.5,
                "& .MuiInputBase-input": {
                    py: 0.8,
                    backgroundColor: "transparent",
                },
            }}
        />
    );
}

export default InputAuth;
