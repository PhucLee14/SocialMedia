import api from "../api/api";

export const getComments = (postId) => {
    return api.get(`/api/comment/${postId}`);
};

export const sendComment = (userId, postId, content) => {
    return api.post("/api/comment/send-comment", {
        userId,
        postId,
        content,
    });
};
