import User from "../models/userModel.js";

export const getUserByID = async (req, res) => {
    return res.status(200).json(req.user);
};
