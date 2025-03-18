import { Box, CircularProgress, Switch } from "@mui/material";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { editProfile, getUserByUserName } from "../../services/userService";
import LoadingProcess from "../../components/Loading/LoadingProcess.jsx";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.js";
import toast from "react-hot-toast";

const accountReducer = (state, action) => {
    switch (action.type) {
        case "SET_IMG":
            return { ...state, profilePicture: action.payload };
        default:
            return state;
    }
};

const initialState = {
    profilePicture: "",
};

function EditProfile() {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);
    const [image, setImage] = useState([]);
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await getUserByUserName(userInfo.userName);
                setUser(data);
                setLoading(false);
            } catch (error) {}
        };
        getUser();
    }, []);

    const onFileSelect = async (e) => {
        const files = e.target.files;
        if (files.length === 0) return;

        const selectedFile = files[0];

        setImage({
            img: selectedFile,
            name: selectedFile.name,
            url: URL.createObjectURL(selectedFile),
        });

        const imageRef = ref(storage, `/images/${selectedFile.name}`);
        try {
            setUpdating(true);
            await uploadBytes(imageRef, selectedFile);
            const downloadUrl = await getDownloadURL(imageRef);
            dispatch({
                type: "SET_IMG",
                payload: downloadUrl,
            });
            setTimeout(async () => {
                const id = user._id;
                const update = await editProfile(id, {
                    ...state,
                    profilePicture: downloadUrl,
                });
                if (update.status === 400) {
                    throw new Error(update.data.error);
                }
                console.log("state: ", state);
                console.log("update: ", update);
                setUpdating(false);
                toast.success(update.message);
            }, 0);
            console.log("Upload success:", downloadUrl);
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    console.log(user);

    const selectFile = (e) => {
        inputRef.current.click();
    };

    return loading ? (
        <LoadingProcess />
    ) : (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "calc(100% - 330px)",
                height: "100vh",
                overflowY: "auto",
            }}
        >
            <Box
                sx={{
                    width: "610px",
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
                        {updating ? (
                            <CircularProgress color="inherit" />
                        ) : (
                            <img
                                src={
                                    image.url ? image.url : user.profilePicture
                                }
                                alt=""
                                style={{
                                    width: "56px",
                                    height: "56px",
                                    borderRadius: "50%",
                                }}
                            />
                        )}
                        <Box sx={{ ml: "16px" }}>
                            <p style={{ fontWeight: "700" }}>{user.userName}</p>
                            <p style={{ color: "#737373" }}>{user.fullName}</p>
                        </Box>
                    </Box>
                    <input
                        type="file"
                        hidden
                        ref={inputRef}
                        onChange={onFileSelect}
                        accept="image/png, image/jpeg*"
                    />
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
                        onClick={selectFile}
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
                            paddingTop: "6px",
                        }}
                    >
                        Editing your links is only available on mobile. Visit
                        the Instagram app and edit your profile to change the
                        websites in your bio.
                    </Box>
                </Box>
                <Box sx={{ p: "6px 0" }}>
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
                                borderRadius: "16px",
                                padding: "8px 16px",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                            }}
                            maxLength="150"
                            placeholder="Bio"
                        />
                    </Box>
                </Box>
                <Box sx={{ p: "6px 0" }}>
                    <p
                        style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            // margin: "34px 0",
                            padding: "16px 0",
                        }}
                    >
                        Show Threads badge
                    </p>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            p: "8px 16px",
                        }}
                    >
                        <Box>Show Threads badge</Box>
                        <Switch />
                    </Box>
                </Box>
                <Box sx={{ p: "6px 0" }}>
                    <p
                        style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            // margin: "34px 0",
                            padding: "16px 0",
                        }}
                    >
                        Gender
                    </p>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            p: "16px",
                        }}
                    >
                        <i class="fa-solid fa-chevron-down"></i>
                    </Box>
                    <Box
                        sx={{
                            fontSize: "12px",
                            color: "#737373",
                            paddingTop: "6px",
                        }}
                    >
                        This won’t be part of your public profile.
                    </Box>
                </Box>
                <Box sx={{ p: "6px 0" }}>
                    <p
                        style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            // margin: "34px 0",
                            padding: "16px 0",
                        }}
                    >
                        Show account suggestions on profiles
                    </p>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            p: "8px 16px",
                        }}
                    >
                        <Box>
                            <p>Show account suggestions on profiles</p>
                            <p
                                style={{
                                    fontSize: "12px",
                                    color: "#737373",
                                    paddingTop: "6px",
                                }}
                            >
                                Choose whether people can see similar account
                                suggestions on your profile, and whether your
                                account can be suggested on other profiles.
                            </p>
                        </Box>
                        <Switch />
                    </Box>
                </Box>
                <Box
                    sx={{
                        fontSize: "12px",
                        color: "#737373",
                        paddingTop: "6px",
                    }}
                >
                    Certain profile info, like your name, bio and links, is
                    visible to everyone.
                    <span style={{ cursor: "pointer" }}>
                        {" "}
                        See what profile info is visible
                    </span>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    width: "610px",
                    margin: "40px 0 60px",
                }}
            >
                <Box
                    sx={{
                        color: "#fff",
                        bgcolor: "#0095f6",
                        fontWeight: "500",
                        p: "12px 96px",
                        borderRadius: "10px",
                        fontSize: "14px",
                        cursor: "pointer",
                    }}
                >
                    Submit
                </Box>
            </Box>
        </Box>
    );
}

export default EditProfile;
