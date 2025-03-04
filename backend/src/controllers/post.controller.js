import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
    const { author, content, medias, tag } = req.body;
    try {
        const post = await Post.create({ author, content, medias, tag });
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getPost = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
