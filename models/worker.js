import mongoose from "mongoose";

const workerSchema = mongoose.Schema({
  username: { type: String, required:  true },
  password: { type: String, required: true },
  id: { type: String },
  firstName: String,
  lastName: String,
  cnic: Number,
  work: String,
  contact: Number,
  salary: String,
  description: String,
  address: String,
  availability: String,
  email: { type: String, required: true },
  createdAt: {
      type: Date,
      default: new Date()
  }
  
});

export default mongoose.model("Worker", workerSchema);

