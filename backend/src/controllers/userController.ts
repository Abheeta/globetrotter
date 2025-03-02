import { Request, Response } from "express";
import User from "../models/User";

export const fetchUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, attempted, correct } = req.body;

    if (typeof username !== "string") {
      res.status(400).json({ error: "username must be a string" });
      return;
    }

    if (typeof attempted !== "number") {
      res.status(400).json({ error: "attempted must be a number" });
      return;
    }

    if (typeof correct !== "number") {
      res.status(400).json({ error: "correct must be a number" });
      return;
    }

    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username, attempted, correct });
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};