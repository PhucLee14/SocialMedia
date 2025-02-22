import React from "react";

function SearchPopup() {
    return (
        <div
            className={`h-screen bg-white z-40 absolute top-0 min-w-96 drop-shadow-[8px_0_8px_rgba(0,0,0,0.1)] rounded-2xl animate-fade-right animate-duration-400 animate-ease-in-out`}
        >
            <div className="px-4">
                <p className="py-6 text-2xl font-bold">Search</p>
                <input
                    type="text"
                    className="border-none w-full bg-gray-200 rounded-xl px-4 py-2 my-6 focus:outline-none"
                />
            </div>
            <div className="border border-gray-200"></div>
        </div>
    );
}

export default SearchPopup;
