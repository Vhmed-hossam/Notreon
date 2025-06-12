import mongoose from "mongoose";

const pageschema = new mongoose.Schema({
  content: { type: String, required: true, default: "" },
  title: { type: String, required: true, default: "" },
  pageId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pages = mongoose.models.Pages || mongoose.model("Pages", pageschema);

export default Pages;
