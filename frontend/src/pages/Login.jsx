import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputAuth from "../components/InputAuth";
import { login } from "../services/authService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/slices/userSlice";

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
            <div className="flex flex-col items-center w-96 border border-gray-300 p-12">
                <p className="mb-12">Web Name</p>
                {/* <form action="" onSubmit={handleSubmit}> */}
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
                <button
                    className="bg-blue-500 text-white w-full py-1 font-semibold rounded-lg cursor-pointer mt-4"
                    onClick={handleSubmit}
                >
                    Log in
                </button>
                {/* </form> */}
                <p className="my-4">OR</p>
                <button className="text-blue-500 w-full font-semibold rounded-lg cursor-pointer">
                    Login with Facebook
                </button>
                <Link to="/forgotpassword" className="text-sm mt-4">
                    Forgot Password?
                </Link>
            </div>
            <div className="flex justify-center w-96 border border-gray-300 p-4 mt-4">
                <p>Don't have an account?</p>
                <Link
                    to="/register"
                    className="text-blue-500 font-semibold ml-2"
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default Login;
