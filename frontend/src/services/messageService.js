import api from "../api/api";

export const getMessage = (id) => {
    return api.get(`/api/message/${id}`);
};

export const sendMessage = (id, data) => {
    return api.post(`/api/message/send/${id}`, data);
};
