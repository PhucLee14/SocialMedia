import User from "../models/userModel.js";

export const login = (req, res) => {
    res.send("Login");
};

export const register = async (req, res) => {
    const { email, phoneNumber, password, fullName } = req.body;
    if (!email || !phoneNumber || !password || !fullName) {
        throw {
            code: 1,
            message: "All fields are required",
        };
    }
    const user = await User.findOne({ email });
    if (user) {
        throw {
            code: 1,
            message: "User already existed",
        };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const defaultPic =
        "https://i.pinimg.com/736x/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg";

    const newUser = new User({
        email,
        phoneNumber,
        password: hashedPassword,
        fullName,
        profilePicture: defaultPic,
    });

    res.send("Register");
};

export const logout = (req, res) => {
    res.send("Logout");
};
