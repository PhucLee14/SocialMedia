import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

function PageLink({ img, icon, title, link, onClick, my, fontSize }) {
    return (
        <Box
            sx={{
                width: "calc(100% - 24px)",
                display: "flex",
                mx: 1.5,
            }}
        >
            <Button
                component={Link}
                to={link || ""}
                onClick={onClick}
                sx={{
                    backgroundColor: "transparent",
                    border: "none",
                    width: "100%",
                    minWidth: 0,
                    my: my ? my : 1,
                    pl: 1,
                    justifyContent: "flex-start",
                    textTransform: "none",
                    // fontSize: fontSize ? fontSize : "1rem",
                    fontWeight: "medium",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    boxShadow: "none",
                    "&:hover": {
                        backgroundColor: "grey.100",
                    },
                    color: "black",
                }}
            >
                {img ? (
                    <img
                        src={img}
                        alt=""
                        style={{ width: 24, height: 24, borderRadius: "50%" }}
                    />
                ) : (
                    <Typography variant="h6" sx={{ ml: 0.75, width: "24px" }}>
                        {icon}
                    </Typography>
                )}

                <Typography
                    variant="body1"
                    sx={{ fontSize: fontSize ? fontSize : "1rem" }}
                >
                    {title}
                </Typography>
            </Button>
        </Box>
    );
}

export default PageLink;
