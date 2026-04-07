import api from "../api/api";

export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post(`/api/upload/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const uploadImages = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
    }
    return api.post(`/api/upload/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
