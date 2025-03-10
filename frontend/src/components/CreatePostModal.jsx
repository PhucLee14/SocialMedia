import React, { useEffect, useReducer, useRef, useState } from "react";
import { Box, Typography, Button, TextField, Switch } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { storage } from "../firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    uploadBytes,
} from "firebase/storage";
import { getUser } from "../services/userService";
import { createPost } from "../services/postService";

const postReducer = (state, action) => {
    switch (action.type) {
        case "SET_AUTHOR":
            return { ...state, author: action.payload };
        case "SET_CONTENT":
            return { ...state, content: action.payload };
        case "SET_MEDIAS":
            return { ...state, medias: action.payload };
        case "SET_IS_HIDE_LIKE_AND_VIEW_COUNT":
            return { ...state, hideLikeAndComment: action.payload };
        case "SET_ALLOW_COMMENT":
            return { ...state, allowComment: action.payload };
        default:
            return state;
    }
};

const initialState = {
    author: "",
    content: "",
    medias: [],
    tag: [],
    hideLikeAndComment: false,
    allowComment: true,
};

function CreatePostModal({ onClick }) {
    const inputRef = useRef(null);
    const [image, setImage] = useState([]);
    const [imagesObj, setImagesObj] = useState();
    const [user, setUser] = useState(null);
    const [isAccessibility, setIsAccessibility] = useState(false);
    const [isAdvancedSettings, setIsAdvancedSettings] = useState(false);
    const [state, dispatch] = useReducer(postReducer, initialState);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser();
                setUser(data);
                dispatch({
                    type: "SET_AUTHOR",
                    payload: data._id,
                });
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, []);

    console.log(user);

    const onDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    };

    const onDragLeave = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        setImagesObj(files);
        console.log("imgobj: ", imagesObj);
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split("/")[0] !== "image") {
                console.log(files[i]);
                continue;
            }
            if (
                !image.some((e) => {
                    e.name === files[i].name;
                })
            ) {
                setImage((prevImages) => [
                    ...prevImages,
                    {
                        img: files[i],
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    };

    const onFileSelect = (e) => {
        const files = e.target.files;
        setImagesObj(files);
        console.log("imgobj: ", imagesObj);
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split("/")[0] !== "image") {
                console.log(files[i]);
                continue;
            }
            if (
                !image.some((e) => {
                    e.name === files[i].name;
                })
            ) {
                setImage((prevImages) => [
                    ...prevImages,
                    {
                        img: files[i],
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    };

    const selectFiles = (e) => {
        inputRef.current.click();
    };

    const handleSubmit = async () => {
        console.log(state);
        try {
            if (imagesObj) {
                for (let i = 0; i < imagesObj.length; i++) {
                    const imageRef = ref(
                        storage,
                        `/images/${imagesObj[i].name}`
                    );
                    try {
                        await uploadBytes(imageRef, imagesObj[i]);

                        const temp = await getDownloadURL(imageRef);

                        dispatch({
                            type: "SET_MEDIAS",
                            payload: state.medias.push(temp),
                        });

                        console.log("Upload success:", temp);
                    } catch (error) {
                        console.error("Upload error:", error);
                    }
                }
            }
            console.log(state);
            const data = await createPost(state);
            if (data.status === 400) {
                throw new Error(data.data.error);
            }
            console.log("data: ", data);
            location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh",
                position: "absolute",
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
                sx={{
                    backgroundColor: "white",
                    width: 600,
                    height: "80vh",
                    borderRadius: 3,
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 101,
                    display: image.length > 0 ? "none" : "flex",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        textAlign: "center",
                        py: 2,
                        fontWeight: "bold",
                        borderBottom: "1px solid gray",
                    }}
                >
                    Create new post
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                            }}
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                        >
                            <ImageOutlinedIcon
                                sx={{ fontSize: 80, color: "gray" }}
                            />
                            <Typography variant="h6" sx={{ my: 2 }}>
                                Drag photos and videos here
                            </Typography>
                            <input
                                type="file"
                                hidden
                                ref={inputRef}
                                onChange={onFileSelect}
                                accept="image/png, image/gif, image/jpeg, video/mp4,video/x-m4v,video/*"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    px: 3,
                                    py: 1,
                                    textTransform: "none",
                                    borderRadius: 2,
                                    backgroundColor: "#2196f3",
                                }}
                                onClick={selectFiles}
                            >
                                Select from computer
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {image.length > 0 ? (
                <Box
                    sx={{
                        backgroundColor: "white",
                        width: 940,
                        height: "80vh",
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: 101,
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            textAlign: "center",
                            py: 2,
                            fontWeight: "bold",
                            borderBottom: "1px solid #ccc",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <p></p>
                        <p style={{ marginLeft: "30px" }}>Create new post</p>
                        <p
                            style={{
                                marginRight: "10px",
                                fontSize: "12px",
                                fontWeight: "500",
                                color: "#0095f6",
                                cursor: "pointer",
                            }}
                            onClick={handleSubmit}
                        >
                            Share
                        </p>
                    </Box>
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                        }}
                    >
                        <Box
                            sx={{
                                // width: "100%",
                                height: "100%",
                                position: "relative",
                            }}
                        >
                            <img
                                src={image[image.length - 1].url}
                                style={{
                                    width: "600px",
                                    height: "100%",
                                }}
                            ></img>
                        </Box>
                        <Box
                            sx={{
                                width: "340px",
                                borderLeft: "1px solid #ccc",
                                overflowY: "scroll",
                                height: "600px",
                            }}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        py: 2,
                                        px: 3,
                                    }}
                                >
                                    <img
                                        src={user.profilePicture}
                                        alt=""
                                        style={{
                                            width: 28,
                                            height: 28,
                                            marginRight: "12px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    <Box>
                                        <Box
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                            }}
                                        >
                                            {user.userName}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    gap: 1,
                                    pb: "10px",
                                }}
                            >
                                <textarea
                                    style={{
                                        border: "none",
                                        outline: "none",
                                        width: "calc(100% - 20px)",
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                        resize: "none",
                                        height: "168px",
                                    }}
                                    maxLength={2200}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "SET_CONTENT",
                                            payload: e.target.value,
                                        })
                                    }
                                />
                                <Box
                                    sx={{
                                        width: "calc(100% - 20px)",
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <i class="fa-regular fa-face-smile"></i>
                                    <p>0/2200</p>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    borderTop: "1px solid #ccc",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: "10px",
                                }}
                            >
                                <p style={{ color: "#999" }}>Add location</p>
                                <i class="fa-regular fa-location-dot"></i>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: "10px",
                                }}
                            >
                                <p style={{ color: "#999" }}>
                                    Add collaborators
                                </p>
                                <i class="fa-regular fa-user-plus"></i>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    p: "10px",
                                    width: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                    onClick={() =>
                                        setIsAccessibility(!isAccessibility)
                                    }
                                >
                                    <p>Accessibility</p>
                                    {isAccessibility ? (
                                        <i class="fa-solid fa-chevron-up"></i>
                                    ) : (
                                        <i class="fa-solid fa-chevron-down"></i>
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: isAccessibility
                                            ? "flex"
                                            : "none",
                                        flexDirection: "column",
                                        alignItems: "start",
                                        gap: 1,
                                    }}
                                >
                                    <p style={{ color: "#999", fontSize: 12 }}>
                                        Alt text describes your photos for
                                        people with visual impairments. Alt text
                                        will be automatically created for your
                                        photos or you can choose to write your
                                        own
                                    </p>
                                    <Box sx={{ width: "100%" }}>
                                        <TextField
                                            outline="none"
                                            sx={{ width: "100%" }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    p: "10px",
                                    width: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                    onClick={() =>
                                        setIsAdvancedSettings(
                                            !isAdvancedSettings
                                        )
                                    }
                                >
                                    <p>Advanced Settings</p>
                                    {isAdvancedSettings ? (
                                        <i class="fa-solid fa-chevron-up"></i>
                                    ) : (
                                        <i class="fa-solid fa-chevron-down"></i>
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: isAdvancedSettings
                                            ? "block"
                                            : "none",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "start",
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mt: 2,
                                            }}
                                        >
                                            <p>
                                                Hide like and view counts on
                                                this post
                                            </p>
                                            <Switch
                                                onChange={(e) => {
                                                    dispatch({
                                                        type: "SET_IS_HIDE_LIKE_AND_VIEW_COUNT",
                                                        payload:
                                                            !state.hideLikeAndComment,
                                                    });
                                                }}
                                            />
                                        </Box>
                                        <p
                                            style={{
                                                color: "#999",
                                                fontSize: 12,
                                            }}
                                        >
                                            Only you will see the total number
                                            of likes and views on this post. You
                                            can change this later by going to
                                            the ··· menu at the top of the post.
                                            To hide like counts on other
                                            people's posts, go to your account
                                            settings.
                                        </p>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "start",
                                            gap: 1,
                                            mb: 4,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mt: 2,
                                            }}
                                        >
                                            <p>Turn off commenting</p>
                                            <Switch
                                                onChange={(e) => {
                                                    dispatch({
                                                        type: "SET_ALLOW_COMMENT",
                                                        payload:
                                                            !state.allowComment,
                                                    });
                                                }}
                                            />
                                        </Box>
                                        <p
                                            style={{
                                                color: "#999",
                                                fontSize: 12,
                                            }}
                                        >
                                            You can change this later by going
                                            to the ··· menu at the top of your
                                            post.
                                        </p>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ) : (
                ""
            )}
        </Box>
    );
}

export default CreatePostModal;
