import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";
import ActionButton from "../Button/ActionButton";
import { Link } from "react-router-dom";

function UserFollowTag({ userId }) {
    const me = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(null);
    const [followingList, setFollowingList] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(userId);
                data ? setUser(data) : setUser(null);
            } catch (error) {
                console.log(error);
            }
        };
        const getFollowing = async () => {
            try {
                const data = await getUserById(me._id);
                setFollowingList(data.following);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
        getFollowing();
    }, [userId]);
    const isFollowing = followingList && followingList.includes(userId);
    console.log("followingList: ", followingList);
    console.log("user: ", user);
    return (
        user && (
            <>
                <Box display={"flex"} component={Link} to={`/${user.userName}`}>
                    <img
                        src={user.profilePicture}
                        alt=""
                        style={{ width: "44px", borderRadius: "50%" }}
                    />
                    <Box ml={2}>
                        <Box sx={{ fontWeight: "600", fontSize: "14px" }}>
                            {user.userName}
                        </Box>
                        <Box sx={{ color: "#737373", fontSize: "14px" }}>
                            {user.fullName}
                        </Box>
                    </Box>
                </Box>
                <ActionButton
                    text={isFollowing ? "Following" : "Follow"}
                    active={isFollowing}
                />
            </>
        )
    );
}

export default UserFollowTag;
