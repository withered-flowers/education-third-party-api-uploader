import multer from "multer";

const uploader = multer({
  storage: multer.memoryStorage(),
});

// Key: "file" is the key from the form-data
export const middlewareUpload = uploader.single("file");
