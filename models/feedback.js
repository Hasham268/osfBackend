import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
  reviewer: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String, required: true },
  post: {type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
});

export default mongoose.model("Feedback", feedbackSchema);

