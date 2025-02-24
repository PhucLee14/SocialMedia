import React from "react";

function InputAuth({ type, placeholder, onChange }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="py-2 px-1 w-full border-gray-400 bg-slate-50 mb-2 text-xs"
            onChange={onChange}
        />
    );
}

export default InputAuth;
