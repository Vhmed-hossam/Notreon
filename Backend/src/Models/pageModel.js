import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: "text",
  },
  content: { type: String, required: true, default: "" },
  title: { type: String, required: true, default: "New Page" },
  pageId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: { type: String, required: true },
});

const Page = mongoose.models.Page || mongoose.model("Page", pageSchema);

export default Page;
