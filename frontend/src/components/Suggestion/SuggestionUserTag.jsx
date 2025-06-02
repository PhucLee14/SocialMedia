import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function SuggestionUserTag({ user }) {
    return (
        <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={2}
        >
            <Box display={"flex"} alignItems={"center"} gap={1}>
                <Box component={Link} to={`/${user.userName}`}>
                    <img
                        src={user.profilePicture}
                        alt=""
                        style={{ width: "44px", borderRadius: "50%" }}
                    />
                </Box>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    ml={1}
                >
                    <Box
                        fontSize="14px"
                        fontWeight={"500"}
                        component={Link}
                        to={`/${user.userName}`}
                    >
                        {user.userName}
                    </Box>
                    <Box fontSize={"12px"} color={"#737373"}>
                        Suggested for you
                    </Box>
                </Box>
            </Box>
            <Box
                fontSize={"12px"}
                color={"#0095f6"}
                fontWeight={"500"}
                sx={{ cursor: "pointer" }}
            >
                Follow
            </Box>
        </Box>
    );
}

export default SuggestionUserTag;
