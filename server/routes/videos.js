import express from "express";
import { addVideo, addview, deleteVideo, getVideo, getbytags, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import {verifyToken} from "../verifytoken.js"


const router = express.Router();

//create a video

router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find/:id", getVideo)
router.put("/views/:id", addview)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub", verifyToken, sub)
router.get("/tags", getbytags)
router.get("/search", search)






export default router