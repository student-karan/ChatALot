import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadOnCloudinary = async (ProductFilePath) => {
    try {
        if (!ProductFilePath) {
            throw new Error("You must provide an image file.");
        }
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(ProductFilePath,
            { resource_type: "auto", folder: "ChataLot_APP" });

        // Delete temp file after successful upload
        fs.unlinkSync(ProductFilePath);
        return response.secure_url;
    } catch (err) {
        fs.unlinkSync(ProductFilePath);
        throw new Error("AN error occured while uploading the file on cloudinary");
    }
}

export default uploadOnCloudinary;