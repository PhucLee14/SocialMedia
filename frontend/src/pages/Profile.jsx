import React, { useEffect, useState } from "react";
import { getUserByUserName } from "../services/userService";
import { Link, useParams } from "react-router-dom";

function Profile() {
    const param = useParams();
    console.log(param.userName);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const data = await getUserByUserName(param.userName);
            console.log(data);
            setUser(data);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    };
    return user ? (
        <div className="w-screen flex flex-col items-center absolute left-[128px]">
            <div className="flex max-w-[940px] w-[940px] mt-16 border-b border-gray-300 pb-12">
                <img
                    src={user.profilePicture}
                    alt=""
                    className="w-36 h-36 rounded-full mr-24 ml-16"
                />
                <div className="w-full h-36">
                    <div className="flex">
                        <p className="text-xl mr-4">{user.userName}</p>
                        <Link className="btn rounded-lg bg-gray-100 py-1 h-auto mr-2">
                            Edit profile
                        </Link>
                        <Link className="btn rounded-lg bg-gray-100 py-1 h-auto">
                            View achive
                        </Link>
                    </div>
                    <div className="flex my-8">
                        <div className="font-semibold flex">
                            <p>0</p>
                            <p className="font-light text-gray-600 ml-1">
                                posts
                            </p>
                        </div>
                        <div className="font-semibold flex mx-10">
                            <p>{user.followers.length}</p>
                            <p className="font-light text-gray-600 ml-1">
                                followers
                            </p>
                        </div>
                        <div className="font-semibold flex">
                            <p>{user.following.length}</p>
                            <p className="font-light text-gray-600 ml-1">
                                following
                            </p>
                        </div>
                    </div>
                    <div className="font-semibold">{user.fullName}</div>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
}

export default Profile;
