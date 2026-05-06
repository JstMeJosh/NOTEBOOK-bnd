import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["work", "study", "casual"],
      default: "casual",
    },
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
