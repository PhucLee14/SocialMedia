import React from "react";

function NavButton({ icon, title, width }) {
    return (
        <div className="w-full flex justify-center">
            <button
                className={`btn bg-transparent border-none ${width} my-2 pl-2 hover:bg-gray-100 justify-start text-base font-medium gap-4`}
            >
                <p className="text-2xl ml-1">{icon}</p>
                {title}
            </button>
        </div>
    );
}

export default NavButton;
