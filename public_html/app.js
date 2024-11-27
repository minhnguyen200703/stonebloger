const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all("*", (req, res) => {
    return handle(req, res);
  });
app.post("/news", async (req, res) => {
  try {
    const { title, image, detail } = req.body;

    if (!title || !detail) {
      return res.status(400).json({ message: "Tiêu đề và nội dung là bắt buộc" });
    }

    const newNews = new News({ title, image, detail });
    await newNews.save();

    res.status(201).json({ message: "Bài viết đã được lưu", data: newNews });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
