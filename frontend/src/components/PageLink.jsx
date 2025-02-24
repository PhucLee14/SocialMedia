import React from "react";
import { Link } from "react-router-dom";

function PageLink({ img, icon, title, link, width, onClick }) {
    return (
        <div className="w-full flex justify-center">
            <Link
                className={`btn bg-transparent border-none ${width} my-2 pl-2 hover:bg-gray-100 justify-start text-base font-medium gap-4 shadow-none`}
                to={link ? link : ""}
                onClick={onClick}
            >
                {img ? (
                    <img src={img} alt="" className="w-6 h-6 rounded-full" />
                ) : (
                    <p className="text-2xl ml-1">{icon}</p>
                )}
                {title}
            </Link>
        </div>
    );
}

export default PageLink;
