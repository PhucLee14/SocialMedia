import Post from "../models/postModel.js";

const createPost = async (req, res) => {
    const { author, content, medias, tag, hideLikeAndComment, allowComment } =
        req.body.data;
    try {
        const post = new Post({
            author,
            content,
            medias,
            tag,
            hideLikeAndComment,
            allowComment,
        });

        console.log("Dữ liệu sẽ lưu:", post);

        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { createPost, getPost, getPostById };
