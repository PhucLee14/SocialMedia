import User from "../models/userModel.js";

export const getUser = async (req, res) => {
    return res.status(200).json(req.user);
};

export const getUserByID = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
};

export const getUserByUsername = async (req, res) => {
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
