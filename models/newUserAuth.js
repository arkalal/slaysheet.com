import mongoose, { Schema } from "mongoose";

const newUserAuthSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NewUserAuth =
  mongoose.models.NewUserAuth ||
  mongoose.model("NewUserAuth", newUserAuthSchema);

export default NewUserAuth;
