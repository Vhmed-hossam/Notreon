import mongoose from "mongoose";

const routesSchema = new mongoose.Schema(
  {
    favorites: [
      {
        content: { type: String, required: true, default: "" },
        title: { type: String, required: true, default: "" },
        pageId: { type: String, required: true },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    pages: [
      {
        content: { type: String, required: true, default: "" },
        title: { type: String, required: true, default: "" },
        pageId: { type: String, required: true },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Routes = mongoose.models.Routes || mongoose.model("Routes", routesSchema);

export default Routes;
