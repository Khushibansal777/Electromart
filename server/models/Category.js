import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  group: String,
});

export default mongoose.model("Category", categorySchema);
