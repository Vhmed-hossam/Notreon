import mongoose from "mongoose";

const PagesSchema = new mongoose.Schema(
  {
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page',
      required: true
    }],
    pages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page',
      required: true
    }]
  },
  { timestamps: true }
);

const Pages = mongoose.models.Pages || mongoose.model("Pages", PagesSchema);

export default Pages;