import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
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

// khởi tạo
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api", authRouter);
app.use("/api", userRouter);
mongoose.connect(process.env.URI);
app.get("/", async (req, res) => {
  res.json("success");
});

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
    const safeFileName = file.originalname
      .replace(/[^a-z0-9.]/gi, "_")
      .toLowerCase();
    cb(null, uniqueSuffix + "-" + safeFileName);
  },
});
const upload = multer({ storage: storage });
app.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const avatarFileName = req.file.filename;
    return res.json(avatarFileName);
  } catch (error) {
    res.status(500).json({ message: "Error updating avatar", error });
  }
});
app.use(express.static("src/uploads"));
app.post("/post-news", async (req, res) => {
  try {
    const newData = await News.create(req.body);
    return res.json(newData);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});
app.post("/edit-news/:id", async (req, res) => {
  try {
    const newData = await News.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          detail: req.body.detail,
          image: req.body.image,
        },
      },
      {
        new: true,
      }
    );

    return res.json(newData);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});
app.get("/news", async (req, res) => {
  try {
    const newData = await News.find({});
    return res.json(newData);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});
app.get("/new/:id", async (req, res) => {
  try {
    const newData = await News.findById(req.params.id);
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
server.listen(process.env.PORT, (req, res) => {
  try {
    console.log(`Server is running on port ${process.env.PORT} `);
  } catch (error) {
    console.log(error);
  }
});
