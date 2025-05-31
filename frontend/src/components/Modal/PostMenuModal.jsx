import React from "react";
import { Box, Menu } from "@mui/material";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import MenuField from "../MenuField";

function PostMenuModal({ onClick, link, userId }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const handleCopy = () => {
        navigator.clipboard.writeText(`localhost:3001/${link}`);
    };
    return ReactDOM.createPortal(
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 100,
                }}
                onClick={onClick}
            ></Box>
            <Box
                backgroundColor={"#fff"}
                zIndex={"101"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"400px"}
                borderRadius={"16px"}
            >
                {user._id == userId ? (
                    <>
                        <MenuField text="Delete" isRed={true} />
                        <MenuField text="Edit" isRed={false} />
                        <MenuField
                            text="Hide like count to others"
                            isRed={false}
                        />
                        <MenuField text="Turn off commenting" isRed={false} />
                    </>
                ) : (
                    <>
                        <MenuField text="Report" isRed={true} />
                        <MenuField text="Unfollow" isRed={true} />
                        <MenuField text="Add to favorites" isRed={false} />
                    </>
                )}
                <MenuField
                    text="Go to post"
                    isRed={false}
                    component={Link}
                    to={link}
                />
                <MenuField text="Share to..." isRed={false} />
                <MenuField
                    text="Copy link"
                    isRed={false}
                    onClick={handleCopy}
                />
                <MenuField text="Embed" isRed={false} />
                <MenuField text="About this account" isRed={false} />
                <MenuField text="Cancel" isRed={false} onClick={onClick} />
            </Box>
        </Box>,
        document.body
    );
}

export default PostMenuModal;
