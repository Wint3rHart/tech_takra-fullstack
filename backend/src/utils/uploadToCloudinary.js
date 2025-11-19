import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        // Return both url and public_id
        resolve({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    );

    stream.end(fileBuffer);
  });
};
