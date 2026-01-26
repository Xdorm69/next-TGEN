import mongoose from "mongoose";
const { Schema, models } = mongoose;

const SubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    color: {
      type: String,
      unique: true,
      required: true,
      default: "#000000",
    },
    description: {
      type: String,
      trim: true,
    },
    tests: {
      type: [Schema.Types.ObjectId],
      ref: "Test",
    },
  },
  {
    timestamps: true,
  },
);

SubjectSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.name = this.name.toLowerCase();
  }
});


export const Subject =
  models.Subject || mongoose.model("Subject", SubjectSchema);
