import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    // newsId: { type: mongoose.Schema.Types.ObjectId, ref: "News" },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

categorySchema.plugin(mongoosePaginate);

export default mongoose.model("Category", categorySchema);
