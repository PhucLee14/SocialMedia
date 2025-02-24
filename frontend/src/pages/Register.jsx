import React from "react";
import InputAuth from "../components/InputAuth";
import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col items-center w-96 border border-gray-300 p-12">
                <p>Web Name</p>
                <p className="text-gray-500 text-sm font-semibold my-4 text-center">
                    Sign up to see photos and videos from your friends.
                </p>
                <button className="bg-blue-500 text-white w-full py-1 font-semibold rounded-lg cursor-pointer">
                    Login with Facebook
                </button>
                <p className="my-3">OR</p>
                <InputAuth type="text" placeholder="Mobile Number" />
                <InputAuth type="text" placeholder="Email" />
                <InputAuth type="text" placeholder="Full Name" />
                <InputAuth type="text" placeholder="Username" />
                <InputAuth type="password" placeholder="Password" />
                <button className="bg-blue-500 text-white w-full py-1 font-semibold rounded-lg cursor-pointer">
                    Sign Up
                </button>
                <p className="text-xs text-gray-500 my-3 text-center">
                    People who use our service may have uploaded your contact
                    information to Instagram.
                </p>
                <p className="text-xs text-gray-500 my-3 text-center">
                    By signing up, you agree to our Terms, Data Policy and
                    Cookies Policy.
                </p>
            </div>
            <div className="flex flex-col items-center w-96 border border-gray-300 p-4 mt-4">
                <p>Have an account?</p>
                <Link to="/login" className="text-blue-500 font-semibold">
                    Log in
                </Link>
            </div>
        </div>
    );
}

export default Register;
