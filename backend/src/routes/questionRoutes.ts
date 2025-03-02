import express from "express";
import { getQuestion, submitAnswer } from "../controllers/questionController";
const router = express.Router();
router.post("/get-question", getQuestion);
router.post("/submit-answer", submitAnswer);
export default router;
