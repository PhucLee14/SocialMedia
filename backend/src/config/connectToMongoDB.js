import mongoose from "mongoose";

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            family: 4,
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        if (error.reason) {
            console.error("Reason:", error.reason);
        }
        process.exit(1);
    }
};

export default connectToMongoDb;
