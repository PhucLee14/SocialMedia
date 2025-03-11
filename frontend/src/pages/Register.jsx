import React, { useReducer } from "react";
import InputAuth from "../components/InputAuth";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import toast from "react-hot-toast";

const authReducer = (state, action) => {
    switch (action.type) {
        case "SET_PHONENUMBER":
            return { ...state, phoneNumber: action.payload };
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_FULLNAME":
            return { ...state, fullName: action.payload };
        case "SET_USERNAME":
            return { ...state, userName: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        default:
            return state;
    }
};

const initialState = {
    phoneNumber: "",
    email: "",
    fullName: "",
    userName: "",
    password: "",
};

function Register() {
    const nav = useNavigate();
    const [state, dispatch] = useReducer(authReducer, initialState);
    const handleSubmit = async () => {
        try {
            const data = await register(state);
            if (data.status === 400) {
                toast.error(data.data.error);
                throw new Error(data.data.error);
            }
            nav("/");
            localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    };
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
                <InputAuth
                    type="text"
                    placeholder="Mobile Number"
                    onChange={(e) =>
                        dispatch({
                            type: "SET_PHONENUMBER",
                            payload: e.target.value,
                        })
                    }
                />
                <InputAuth
                    type="text"
                    placeholder="Email"
                    onChange={(e) =>
                        dispatch({
                            type: "SET_EMAIL",
                            payload: e.target.value,
                        })
                    }
                />
                <InputAuth
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) =>
                        dispatch({
                            type: "SET_FULLNAME",
                            payload: e.target.value,
                        })
                    }
                />
                <InputAuth
                    type="text"
                    placeholder="Username"
                    onChange={(e) =>
                        dispatch({
                            type: "SET_USERNAME",
                            payload: e.target.value,
                        })
                    }
                />
                <InputAuth
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                        dispatch({
                            type: "SET_PASSWORD",
                            payload: e.target.value,
                        })
                    }
                />
                <button
                    className="bg-blue-500 text-white w-full py-1 font-semibold rounded-lg cursor-pointer"
                    onClick={handleSubmit}
                >
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
