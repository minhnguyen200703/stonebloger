import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Export the model as the default export
const Category = mongoose.model("Category", categorySchema);
export default Category;
