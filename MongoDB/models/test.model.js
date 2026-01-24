import mongoose from "mongoose";

const { Schema, models } = mongoose;

/* ---------- Option ---------- */
const optionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { _id: true },
);

/* ---------- Question ---------- */
const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [optionSchema],
      required: true,
      validate: [
        {
          validator: (v) => v.length >= 2,
          message: "A question must have at least 2 options",
        },
        {
          validator: (opts) => opts.filter((o) => o.isCorrect).length === 1,
          message: "Only one option can be correct",
        },
      ],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

/* ---------- Test ---------- */
const testSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      index: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Test = models.Test || mongoose.model("Test", testSchema);
