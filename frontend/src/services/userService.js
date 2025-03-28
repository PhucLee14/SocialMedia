import api from "../api/api";

export const getUser = () => {
    return api.get(`/api/user`);
};

export const getUserByUserName = (userName) => {
    return api.get(`/api/user/u/${userName}`);
};

export const getUserById = (id) => {
    return api.get(`/api/user/${id}`);
};

export const editProfile = (id, data) => {
    return api.patch(`/api/user/account/edit/${id}`, data);
};

export const getUserForSideBar = () => {
    return api.get(`/api/user/getUserForSidebar`);
};
