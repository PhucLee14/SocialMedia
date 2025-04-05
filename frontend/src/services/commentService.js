import api from "../api/api";

export const getComments = (postId) => {
    return api.get(`/api/comment/${postId}`);
};
