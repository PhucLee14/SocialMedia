import api from "../api/api";

export const getUser = () => {
    return api.get(`/api/user`);
};
