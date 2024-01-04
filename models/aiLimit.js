import mongoose, { Schema } from "mongoose";

const aiLimitSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    lock: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AiLimit =
  mongoose.models.AiLimit || mongoose.model("AiLimit", aiLimitSchema);

export default AiLimit;
