import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputAuth from "../components/InputAuth";
import { login } from "../services/authService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/slices/userSlice";
import AuthButton from "../components/Button/AuthButton";

const authReducer = (authState, action) => {
    switch (action.type) {
        case "SET_USERNAME":
            return { ...authState, userName: action.payload };
        case "SET_PASSWORD":
            return { ...authState, password: action.payload };
        default:
            return authState;
    }
};

const initialState = {
    userName: "",
    password: "",
};

function Login() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [authState, authDispatch] = useReducer(authReducer, initialState);
    const handleSubmit = async () => {
        try {
            console.log(authState);
            const data = await login(authState);
            console.log("data: ", data);
            if (data.status === 400) {
                toast.error(data.data.error);
                throw new Error(data.data.error);
            }
            nav("/");

            const expiresAt = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("expiresAt", expiresAt.toString());

            dispatch(setUserInfo(data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col items-center w-96 p-4">
                <h1 className="text-2xl font-bold mb-8">Log in</h1>
                <InputAuth
                    type="text"
                    placeholder="Phone number, username or email"
                    onChange={(e) =>
                        authDispatch({
                            type: "SET_USERNAME",
                            payload: e.target.value,
                        })
                    }
                />
                <InputAuth
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                        authDispatch({
                            type: "SET_PASSWORD",
                            payload: e.target.value,
                        })
                    }
                />
                <AuthButton text="Log in" onClick={handleSubmit} />
                <div className="w-full relative">
                    <div className="border-b-2 border-gray-300 w-full my-6"></div>
                    <p className="text-sm font-semibold text-gray-400 absolute p-2 bg-white right-1/2 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                        OR
                    </p>
                </div>
                <button className="text-blue-500 w-full font-semibold rounded-lg cursor-pointer">
                    Login with Facebook
                </button>
                <Link to="/forgotpassword" className="text-sm mt-4">
                    Forgot Password?
                </Link>
            </div>
            <Link
                to="/register"
                className="text-sm font-bold text-blue-500 absolute top-0 right-0 m-4 border-2 border-b-4 border-gray-300 rounded-2xl px-4 py-2"
            >
                SIGN UP
            </Link>
        </div>
    );
}

export default Login;
