import express from "express";
import { fetchUser } from "../controllers/userController";
const router = express.Router();
router.post("/", fetchUser);
export default router;
