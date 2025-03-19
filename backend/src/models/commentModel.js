import { Schema } from "mongoose";

const commentModel = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    replies: [
        {
            type: Schema.Types.ObjectId,
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
