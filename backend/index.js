import express from "express";
import dotenv from "dotenv";
import authRoute from "./src/routes/auth.route.js";
import connectToMongoDb from "./src/config/connectToMongoDB.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`);
});
