import mongoose, { Document } from "mongoose";

interface ICity extends Document {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
  possible_destinations: string[];
}

const citySchema = new mongoose.Schema<ICity>(
  {
    city: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    clues: [String],
    fun_fact: [String],
    trivia: [String],
    possible_destinations: [String],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ICity>("City", citySchema, "cities");
