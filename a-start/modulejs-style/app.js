import cors from "cors";
import express from "express";

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

app.post("/upload", async (req, res, next) => {
  try {
    // TODO: Upload the file and return the result
  } catch (err) {
    next(err);
  }
});

app.post("/upload/dry-run", async (req, res, next) => {
  try {
    // TODO: Simulate the upload file process and return the result
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
