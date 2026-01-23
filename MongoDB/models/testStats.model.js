import mongoose from "mongoose";
const {Schema, models} = mongoose;

const TestStatsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  test: { type: Schema.Types.ObjectId, ref: "Test", required: true },
  score: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
});

export const TestStats =
  models.TestStats || mongoose.model("TestStats", TestStatsSchema);
