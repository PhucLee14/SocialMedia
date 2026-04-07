import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "social_media",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "mp4", "avi", "mov"],
        transformation: [{ quality: "auto", fetch_format: "auto" }],
    },
});

export { cloudinary, storage };
