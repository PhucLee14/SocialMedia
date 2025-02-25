import mongoose, { Schema } from "mongoose";

const postModel = Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
    },
    medias: [
        {
            type: String,
        },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            content: { type: String },
        },
    ],
    tag: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    hideLikeAndComment: {
        type: Boolean,
        default: false,
    },
    allowComment: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isHide: {
        type: Boolean,
        default: false,
    },
});

const Post = mongoose.model("Post", postModel);

export default Post;
