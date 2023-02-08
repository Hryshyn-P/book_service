import express from "express";
import { userLogin, userRegistration, getUserList } from "../controllers/user.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/registration", userRegistration);
router.post("/login", userLogin);
router.get("/list", auth, getUserList);

export default router;