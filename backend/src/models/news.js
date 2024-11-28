import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String, // Ảnh đại diện của bài viết
    },
    detail: {
      type: String, // Nội dung bài viết dạng HTML
    },
    createdDate: {
      type: Date,
      default: Date.now, // Ngày tạo
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      default: null, // Allow news without a category
    },
  },
  { timestamps: true, versionKey: false }
);

newsSchema.plugin(mongoosePaginate);

export default mongoose.model("News", newsSchema);
