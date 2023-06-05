import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema({
  question: String,
});

export default mongoose.models.Question || mongoose.model("Question", QuestionsSchema);
