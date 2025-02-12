import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { extractTime } from "../../utils/extractTime";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ImageSlide from "../../components/imageSlide/ImageSlide";

const NewsDetail = () => {
    const { id } = useParams();
    const [newsFeed, setNewsFeed] = useState([]);
    const [comments, setComments] = useState([]);
    const [senderId, setSenderId] = useState("");
    const [newsId, setNewsId] = useState("");
    const [content, setContent] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    var localStorageData = localStorage.getItem("user");
    if (localStorageData) {
        var userData = JSON.parse(localStorageData);
        useEffect(() => {
            setSenderId(userData._id);
            setNewsId(id);
        });
    }

    let imageContainrRef = useRef(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/getNews/" + id)
            .then((res) => setNewsFeed(res.data))
            .catch((err) => console.log("loi ben frontend"));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:5000/comments/" + id)
            .then((res) => setComments(res.data))
            .catch((err) => console.log("loi ben frontend"));
    }, [comments]);

    const handleComment = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/comments/", {
                senderId,
                newsId,
                content,
            })
            .then((res) => {
                setContent("");
                document.getElementById("comment").value = "";
            })
            .catch((err) => toast.error(err));
    };

    const prevImage = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage
            ? newsFeed.images.length - 1
            : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextImage = () => {
        const isLastImage = currentIndex === newsFeed.images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // console.log(newsFeed);
    // console.log(comments);
    // console.log(content);
    return (
        <div className="mt-14 mx-3 w-screen flex justify-center min-h-0 h-[740px] rounded-2xl">
            <div className="w-1/3 bg-white border-r rounded-l-2xl overflow-y-scroll">
                <Link
                    to="#"
                    onClick={() => window.history.back()}
                    className="cursor-pointer"
                >
                    <i class="fa-solid fa-arrow-left p-4  "></i>
                </Link>
                <div className="flex p-4 pt-0 border-b">
                    {newsFeed.author?.profilePic && (
                        <img
                            src={newsFeed.author.profilePic}
                            alt=""
                            className="w-12 h-12 mr-2"
                        />
                    )}
                    <div className="flex flex-col">
                        {newsFeed.author?.fullName && (
                            <p className="font-bold">
                                {newsFeed.author.fullName}
                            </p>
                        )}
                        <p className=" mt-1 text-xs font-mediums text-gray-400">
                            {extractTime(newsFeed.createdAt)}
                        </p>
                    </div>
                </div>
                <h1 className="m-4 mt-2 font-bold text-xl">{newsFeed.title}</h1>
                <p className="ml-4 font-bold text-xs italic text-indigo-600">
                    {newsFeed.type}
                </p>
                <div className="m-4">{newsFeed.content}</div>
                {newsFeed.images ? (
                    newsFeed.images.length > 0 ? (
                        <div className="w-full h-[540px] m-auto py-4 px-2 relative group">
                            <div
                                className=" absolute top-[50%] -translate-x-0 translate-y-[-50%] left-6 text-2xl cursor-pointer"
                                onClick={prevImage}
                            >
                                <i class="fa-regular fa-chevron-left"></i>
                            </div>
                            <div
                                style={{
                                    backgroundImage: `url(${newsFeed.images[currentIndex][0]})`,
                                }}
                                className="w-full h-5/6 bg-center bg-cover rounded-2xl"
                            ></div>

                            <div
                                className=" absolute top-[50%] -translate-x-0 translate-y-[-50%] right-6 text-2xl cursor-pointer h-12"
                                onClick={nextImage}
                            >
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    ) : (
                        ""
                    )
                ) : (
                    ""
                )}
            </div>
            {newsFeed.status !== "approve" ? (
                ""
            ) : (
                <div className="w-1/4 bg-white flex flex-col justify-between rounded-r-2xl overflow-hidden">
                    <div className="flex flex-col w-full h-[93%]">
                        <div className="flex p-4 border-b">
                            {newsFeed.author?.profilePic && (
                                <img
                                    src={newsFeed.author.profilePic}
                                    alt=""
                                    className="w-12 h-12 mr-2"
                                />
                            )}
                            <div className="flex flex-col">
                                {newsFeed.author?.fullName && (
                                    <p className="font-bold">
                                        {newsFeed.author.fullName}
                                    </p>
                                )}
                                <p className=" mt-1 text-xs font-mediums text-gray-400">
                                    {extractTime(newsFeed.createdAt)}
                                </p>
                            </div>
                        </div>
                        <div className="h-full overflow-y-scroll">
                            {comments.length !== 0 ? (
                                comments.reverse().map((comment) => {
                                    return (
                                        <div className="flex mt-2 mb-6 mx-4">
                                            <img
                                                src={
                                                    comment.senderId.profilePic
                                                }
                                                alt=""
                                                className="w-10 h-10 mr-4"
                                            />
                                            <div>
                                                <span className="font-bold mr-2">
                                                    {comment.senderId.fullName}
                                                </span>
                                                <span className="text-sm">
                                                    {comment.content}
                                                </span>
                                                <p className=" mt-1 text-xs font-mediums text-gray-400">
                                                    {extractTime(
                                                        comment.createdAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col justify-center items-center h-5/6">
                                    <i class="fa-solid fa-message-lines text-[80px]"></i>
                                    <p className="text-2xl mt-4">
                                        Không có bình luận
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <form action="" onSubmit={handleComment}>
                        {userData ? (
                            <input
                                type="text"
                                className="border-gray-300 border-t w-full p-4 focus:outline-none text-sm z-50"
                                placeholder="Nhập bình luận"
                                id="comment"
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                            />
                        ) : (
                            <input
                                type="text"
                                className="border-gray-300 border-t w-full p-4 focus:outline-none text-sm z-50 cursor-not-allowed opacity-50"
                                placeholder="Đăng nhập để bình luận"
                                disabled
                            />
                        )}
                    </form>
                </div>
            )}
        </div>
        // <ImageSlide imageArr={newsFeed.images} />
    );
};

export default NewsDetail;
