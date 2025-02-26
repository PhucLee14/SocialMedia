import React from "react";

function CreatePostModal({ onClick }) {
    return (
        <div className="flex items-center justify-center w-screen h-screen absolute top-0 left-0">
            <div
                className=" z-[100] h-screen w-screen bg-black opacity-60 absolute top-0 left-0"
                onClick={onClick}
            ></div>
            <div className="flex flex-col items-center z-[101] bg-white w-[600px] h-4/5 rounded-xl">
                <div className="border-b border-gray-300 w-full text-center py-2 font-semibold">
                    Create new post
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <i class="fa-solid fa-images text-6xl"></i>
                    <p className="text-xl my-4">Drag photos and videos here</p>
                    <button className="py-1 px-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
                        Select from computer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;
