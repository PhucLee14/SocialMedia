import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const getUser = async (req, res) => {
    return res.status(200).json(req.user);
};

const getUserByID = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
};

const getUserByUsername = async (req, res) => {
    const userName = req.params.userName;
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

const editProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        Object.assign(user, updates);

        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({
            _id: { $ne: loggedInUserId },
        }).select("-password");
        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error in getUserForSidebar: ".error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const likePost = async (req, res) => {
    const { userId } = req.params;
    const { postId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.likes.includes(postId)) {
            user.likes = user.likes.filter((id) => id != postId);
        } else {
            user.likes.push(postId);
        }

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const savePost = async (req, res) => {
    const { userId } = req.params;
    const { postId } = req.body;

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

export {
    getUser,
    getUserByID,
    getUserByUsername,
    editProfile,
    getUserForSidebar,
    likePost,
    savePost,
};
