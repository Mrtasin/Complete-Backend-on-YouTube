import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUplodeOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log(`response :- ${response}`);

    return response;
  } catch (error) {
    console.error(`File uploding error :- ${error}`);
    return null;
  } finally {
    if (filePath) fs.unlinkSync(filePath);
  }
};

export default fileUplodeOnCloudinary;
