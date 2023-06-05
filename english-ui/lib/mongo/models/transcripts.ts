import mongoose from "mongoose";

const TranscriptsSchema = new mongoose.Schema({
  uuid: String,
  transcripts: [
    {
      id: String,
      text: String,
      correction: String,
    },
  ],
});

export default mongoose.models.Transcripts || mongoose.model("Transcripts", TranscriptsSchema);
