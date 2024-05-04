import express from "express";
import { google, signin, signup } from "../controllers/auth.js";



const router = express.Router();

//create a user
router.post("/signup", signup)
//sign in 
router.post("/signin", signin)
//googleauth
router.post("/google", google)

export default router