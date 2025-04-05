import Comment from "../models/commentModel.js";

const getComments = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await Comment.find({ postId });
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const sendComment = async (req, res) => {
    const { userId, postId, content } = req.body;
    try {
        const comment = new Comment({
            userId,
            postId,
            content,
        });
        await comment.save();
        return res.status(201).json(comment);
    } catch (error) {
        return res, status(500).json({ error: error.message });
    }
};

export { getComments, sendComment };
