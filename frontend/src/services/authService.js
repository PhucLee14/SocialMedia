import api from "../api/api";

export const register = (data) => {
    return api.post(`/api/auth/register`, data);
};

export const login = (data) => {
    return api.post(`/api/auth/login`, data);
};

export const logout = () => {
    return api.post(`/api/auth/logout`);
};

export const verifyOtp = (data) => {
    return api.post(`/api/auth/verify-otp`, data);
};

export const forgotPassword = (data) => {
    return api.post(`/api/auth/forgot-password`, data);
};

export const resetPassword = (token, data) => {
    return api.post(`/api/auth/reset-password/${token}`, data);
};
