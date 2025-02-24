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
