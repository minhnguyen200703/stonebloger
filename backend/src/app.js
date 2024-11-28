import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import categoryRouter from "./routes/category.js"; // Import the category router
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import News from "./models/news.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize the app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter); // Add the category router

// Database connection
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Root route
app.get("/", async (req, res) => {
  res.json("success");
});

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "./uploads/");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const safeFileName = file.originalname.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
    cb(null, uniqueSuffix + "-" + safeFileName);
  },
});
const upload = multer({ storage: storage });

// Image upload endpoint
app.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const avatarFileName = req.file.filename;
    return res.json(avatarFileName);
  } catch (error) {
    res.status(500).json({ message: "Error updating avatar", error });
  }
});

// Serve static files
app.use(express.static("src/uploads"));

// News endpoints
app.post("/post-news", async (req, res) => {
  try {
    const { title, detail, image, category } = req.body; // Include category
    const newData = await News.create({ title, detail, image, category });
    return res.json(newData);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.post("/edit-news/:id", async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          detail: req.body.detail,
          image: req.body.image,
          category: req.body.category, // Include category
        },
      },
      {
        new: true,
      }
    );

    return res.json(updatedNews);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.get("/news", async (req, res) => {
  try {
    const newData = await News.find({}).populate("category"); // Populate category details
    return res.json(newData);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.get("/new/:id", async (req, res) => {
  try {
    const newData = await News.findById(req.params.id).populate("category"); // Populate category details
    return res.json(newData);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.get("/new1/:id", async (req, res) => {
  try {
    const newData = await News.findByIdAndDelete(req.params.id);
    return res.json(newData);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

// Start server
server.listen(process.env.PORT, (req, res) => {
  try {
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
