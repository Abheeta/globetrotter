import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import User from "../models/User";
import City from "../models/City";

export const getQuestion = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;
  let user = null;
  
  // Handle username if provided
  if (username !== undefined) {
    if (typeof username !== "string") {
      res.status(400).json({ error: "username must be a string" });
      return;
    }

    user = await User.findOne({ username });
    if (!user) {
      user = new User({ username });
      await user.save();
    }
  }

  const city = await City.aggregate([{ $sample: { size: 1 } }]);
  if (!city.length) {
    res.status(404).json({ error: "No cities found" });
    return;
  }

  const selectedCity = city[0];
  const response: any = {
    id: selectedCity._id,
    clue: selectedCity.clues[Math.floor(Math.random() * selectedCity.clues.length)],
    options: selectedCity.possible_destinations,
  };

  if (user) {
    response.attempted = user.attempted;
    response.correct = user.correct;
  }

  res.json(response);
};

export const submitAnswer = async (req: Request, res: Response): Promise<void> => {
  const { username, cityId, answer } = req.body;

  if (!isValidObjectId(cityId)) {
    res.status(400).json({ error: "cityId must be a string" });
    return;
  }

  if (typeof answer !== "string") {
    res.status(400).json({ error: "answer must be a string" });
    return;
  }

  // Find the city regardless of username
  const city = await City.findById(cityId);
  if (!city) {
    res.status(404).json({ error: "City not found" });
    return;
  }

  // Initialize response object
  const correct = city.city === answer;
  const response: any = { 
    correct,
    funFact: city.fun_fact[Math.floor(Math.random() * city.fun_fact.length)],
    city: city.city,
  };

  // Handle user data only if username is provided
  if (username !== undefined) {
    if (typeof username !== "string") {
      res.status(400).json({ error: "username must be a string" });
      return;
    }

    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username });
    }

    user.attempted += 1;
    if (correct) {
      user.correct += 1;
    }
    await user.save();

    // Add user stats to response
    response.userStats = {
      attempted: user.attempted,
      correct: user.correct,
    };
  }

  res.json(response);
};