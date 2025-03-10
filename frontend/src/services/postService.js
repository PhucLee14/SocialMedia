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
