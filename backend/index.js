import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth.route.js";
import userRoute from "./src/routes/user.route.js";
import connectToMongoDb from "./src/config/connectToMongoDB.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001";

app.use(express.json());
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`);
});
