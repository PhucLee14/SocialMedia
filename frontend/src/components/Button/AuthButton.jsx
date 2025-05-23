import React from "react";

function AuthButton({ text, onClick }) {
    return (
        <button
            className="bg-blue-500 text-white w-full py-3 font-semibold rounded-2xl cursor-pointer mt-4 border-b-6 border-b-blue-600  hover:bg-blue-400 hover:border-b-blue-500"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default AuthButton;
