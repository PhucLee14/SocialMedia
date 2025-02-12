import axios from "axios";
import React, { useEffect, useState } from "react";
import { extractTime } from "../../../utils/extractTime";

const AdminNews = () => {
    const [newsFeeds, setNewsFeeds] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/newsfeed")
            .then((res) => setNewsFeeds(res.data))
            .catch((err) => console.log(err));
    }, [newsFeeds]);
    // console.log(newsFeeds);
    return (
        <div>
            {newsFeeds.map((newsfeed) => (
                <div className=" flex justify-between w-full p-4 border-b items-center">
                    <div>
                        <p className="font-bold">{newsfeed.title}</p>
                        <p className=" mt-1 text-xs font-mediums text-gray-400">
                            {extractTime(newsfeed.createdAt)}
                        </p>
                    </div>
                    <div>
                        {newsfeed.status === "approve" ? (
                            <i class="fa-solid fa-circle-check text-green-600"></i>
                        ) : newsfeed.status === "pending" ? (
                            <i class="fa-solid fa-circle-minus text-slate-500"></i>
                        ) : (
                            <i class="fa-solid fa-circle-xmark text-red-600"></i>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminNews;
