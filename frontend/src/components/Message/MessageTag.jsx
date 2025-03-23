import { Box } from "@mui/material";
import React from "react";
import camup2 from "../../../public/camup2.jpg";
import { Link } from "react-router-dom";

function MessageTag({ img, name, lastMessage, link }) {
    return (
        <Box
            component={Link}
            to={link || ""}
            sx={{
                display: "flex",
                padding: "8px 24px",
                cursor: "pointer",
                width: "100%",
                "&:hover": { backgroundColor: "#efefef" },
                alignItems: "center",
            }}
        >
            <img
                src={img ? img : camup2}
                alt=""
                style={{
                    width: "56px",
                    marginRight: "10px",
                    borderRadius: "50%",
                }}
            />
            <Box>
                <p style={{ fontSize: "16px" }}>{name ? name : "name"}</p>
                <p style={{ fontSize: "14px", color: "#737373" }}>
                    {lastMessage ? lastMessage : "last message"}
                </p>
            </Box>
        </Box>
    );
}

export default MessageTag;
