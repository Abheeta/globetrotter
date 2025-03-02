import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  attempted: number;
  correct: number;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    attempted: { type: Number, default: 0 },
    correct: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  },
);

export default mongoose.model<IUser>("User", userSchema, "users");
