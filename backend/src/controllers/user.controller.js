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
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.saves.includes(postId)) {
            user.saves = user.saves.filter((id) => id != postId);
        } else {
            user.saves.push(postId);
        }

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const searchUsers = async (req, res) => {
    try {
        const keyword = req.params.keyword || "";

        if (!keyword.trim()) {
            return res.status(400).json({ error: "Keyword cannot be empty" });
        }

        const users = await User.find({
            $or: [
                { userName: { $regex: keyword, $options: "i" } },
                { fullName: { $regex: keyword, $options: "i" } },
            ],
        }).select("-password");

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error in searchUsers:", error);
        return res.status(500).json({ error: error.message });
    }
};

const followUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { followId } = req.body;
        const user = await User.findById(userId);
        const follower = await User.findById(followId);
        if (!follower) {
            return res.status(404).json({ message: "Follower not found" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.following.includes(followId)) {
            user.following = user.following.filter((id) => id != followId);
        } else {
            user.following.push(followId);
        }
        if (follower.followers.includes(userId)) {
            follower.followers = follower.followers.filter(
                (id) => id != userId
            );
        } else {
            follower.followers.push(userId);
        }
        await user.save();
        await follower.save();
        return res.status(200).json(user);
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
    searchUsers,
    followUser,
};
