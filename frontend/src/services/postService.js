import api from "../api/api";

export const getPosts = () => {
    return api.get(`/api/post`);
};

export const createPost = (data) => {
    return api.post(`/api/post/create`, { data });
};

export const getPost = (id) => {
    return api.get(`/api/post/${id}`);
};

export const likePost = (postId, userId) => {
    return api.put(`/api/post/${postId}/like`, { userId });
};

export const savePost = (postId, userId) => {
    return api.put(`/api/post/${postId}/save`, { userId });
};

export const getPostById = (id) => {
    return api.get(`/api/post/${id}`);
};

export const getPostByUserId = (id) => {
    return api.get(`/api/post/u/${id}`);
};
