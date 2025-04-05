import mongoose from "mongoose";

const commentModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false,
    },
    likes: {
        type: Number,
        default: 0,
    },
});

const Comment = mongoose.model("Comment", commentModel);

export default Comment;
