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
    return res.status(200).json(req.user);
};

export {
    getUser,
    getUserByID,
    getUserByUsername,
    editProfile,
    getUserForSidebar,
};
