// If not production, use dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");

// Multer Start Here (utils/multer.js)
const multer = require("multer");

const uploader = multer({
  storage: multer.memoryStorage(),
});

// Key: "file" is the key from the form-data
const middlewareUpload = uploader.single("file");
// End of Multer

// ImageKit Start Here (utils/imagekit.js)
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
// End of ImageKit

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routing
app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "Pong !",
  });
});

// Include middlewareUpload as a middleware
app.post("/upload", middlewareUpload, async (req, res, next) => {
  try {
    // TODO: Upload the file and return the result
    console.log(req.file);

    /*
    req.file 
    {
      fieldname: string,
      originalname: string,
      encoding: string,
      mimetype: string,
      buffer: Buffer,
      size: number
    }
    */

    // Usually we need to convert the image (Buffer) to base64 (string)
    const imageInBase64 = req.file.buffer.toString("base64");
    console.log(imageInBase64);

    // Upload the file to ImageKit
    // https://www.npmjs.com/package/imagekit#file-upload
    const result = await imagekit.upload({
      file: imageInBase64,
      // Get the filename from the originalname (req.file)
      fileName: req.file.originalname,
      // [Optional] set the image tags
      tags: ["test"],
    });

    /*
    result

    {
      fileId: string,
      name: string,
      size: number,
      versionInfo: {
        id: string,
        name: string,
      },
      filePath: string,
      url: string,
      fileType: string,
      height: number,
      width: number,
      thumbnailUrl: string,
      AITags: null
    }
    */
    console.log(result);

    res.status(201).json({
      statusCode: 201,
      message: "Upload success, see console for the result",
    });
  } catch (err) {
    next(err);
  }
});

// Include middlewareUpload as a middleware
app.post("/upload/dry-run", middlewareUpload, async (req, res, next) => {
  try {
    // Simulate the upload file process and return the result
    console.log(req.file);

    /*
    req.file 
    {
      fieldname: string,
      originalname: string,
      encoding: string,
      mimetype: string,
      buffer: Buffer,
      size: number
    }
    */

    // Usually we need to convert the image (Buffer) to base64 (string)
    const imageInBase64 = req.file.buffer.toString("base64");
    console.log(imageInBase64);

    res.status(200).json({
      statusCode: 200,
      message: "Dry run success, see console for the result",
    });
  } catch (err) {
    next(err);
  }
});

// Error Handling
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  console.error(err.stack);
  res.status(statusCode).json({
    statusCode,
    error: message,
  });
});

// Listener
app.listen(port, () => {
  console.log(`Apps is listening at http://localhost:${port}`);
});
