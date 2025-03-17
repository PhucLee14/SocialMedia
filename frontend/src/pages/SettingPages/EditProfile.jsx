import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser, getUserByUserName } from "../../services/userService";
import LoadingProcess from "../../components/Loading/LoadingProcess.jsx";

function EditProfile() {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await getUserByUserName(userInfo.userName);
                console.log(data);
                setUser(data);
                setLoading(false);
            } catch (error) {}
        };
        getUser();
    }, []);

    console.log("user: ", userInfo);
    console.log("userrrrr:", user);

    return loading ? (
        <LoadingProcess />
    ) : (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "calc(100% - 330px)",
            }}
        >
            <Box
                sx={{
                    width: "610px",
                    // display: "flex",
                    // flexDirection: "column",
                    // alignItems: "flex-start",
                }}
            >
                <p
                    style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        margin: "34px 0",
                        padding: "16px 0",
                    }}
                >
                    Edit Profile
                </p>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#efefef",
                        p: "16px",
                        borderRadius: "20px",
                    }}
                >
                    <Box sx={{ display: "flex" }}>
                        <img
                            src={user.profilePicture}
                            alt=""
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "50%",
                            }}
                        />
                        <Box sx={{ ml: "16px" }}>
                            <p style={{ fontWeight: "700" }}>{user.userName}</p>
                            <p style={{ color: "#737373" }}>{user.fullName}</p>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            color: "#fff",
                            bgcolor: "#0095f6",
                            fontWeight: "500",
                            p: "6px 12px",
                            borderRadius: "10px",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                    >
                        Change photo
                    </Box>
                </Box>
                <Box>
                    <p
                        style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            // margin: "34px 0",
                            padding: "16px 0",
                        }}
                    >
                        Website
                    </p>
                    <Box>
                        <input
                            type="text"
                            disabled="true"
                            style={{
                                cursor: "no-drop",
                                width: "100%",
                                borderRadius: "10px",
                                padding: "8px 16px",
                                backgroundColor: "#efefef",
                                border: "1px solid #ccc",
                            }}
                            placeholder="Website"
                        />
                    </Box>
                    <Box
                        sx={{
                            fontSize: "12px",
                            color: "#737373",
                            padding: "6px 0 12px",
                        }}
                    >
                        Editing your links is only available on mobile. Visit
                        the Instagram app and edit your profile to change the
                        websites in your bio.
                    </Box>
                </Box>
                <Box>
                    <p
                        style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            // margin: "34px 0",
                            padding: "16px 0",
                        }}
                    >
                        Bio
                    </p>
                    <Box>
                        <input
                            type="text"
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                padding: "8px 16px",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                            }}
                            maxLength="150"
                            placeholder="Bio"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default EditProfile;
