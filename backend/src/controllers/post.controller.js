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

const likePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((id) => id != userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const savePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.saves.includes(userId)) {
            post.saves = post.saves.filter((id) => id != userId);
        } else {
            post.saves.push(userId);
        }

        await post.save();
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { createPost, getPost, getPostById, likePost, savePost };
