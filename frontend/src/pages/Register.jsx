import React, { useReducer } from "react";
import InputAuth from "../components/InputAuth";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import toast from "react-hot-toast";
import AuthButton from "../components/Button/AuthButton";

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
            console.log("data: ", data);
            nav(`/verify-email?email=${initialState.email}`);
            localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center relative">
            <div className="flex flex-col items-center w-96 p-10">
                <h1 className="text-2xl font-bold mb-4">Sign up</h1>
                <p className="text-gray-500 text-sm font-semibold my-4 text-center">
                    Sign up to see photos and videos from your friends.
                </p>
                <AuthButton text="Login with Facebook" />
                <div className="w-full relative">
                    <div className="border-b-2 border-gray-300 w-full my-6"></div>
                    <p className="text-sm font-semibold text-gray-400 absolute p-2 bg-white right-1/2 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                        OR
                    </p>
                </div>
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
                <AuthButton text="Sign Up" onClick={handleSubmit} />

                <p className="text-xs text-gray-500 my-3 text-center">
                    People who use our service may have uploaded your contact
                    information to Instagram.
                </p>
                <p className="text-xs text-gray-500 my-3 text-center">
                    By signing up, you agree to our Terms, Data Policy and
                    Cookies Policy.
                </p>
            </div>
            <Link
                to="/login"
                className="text-sm font-bold text-blue-500 absolute top-0 right-0 m-4 border-2 border-b-4 border-gray-300 rounded-2xl px-4 py-2"
            >
                LOGIN
            </Link>
        </div>
    );
}

export default Register;
