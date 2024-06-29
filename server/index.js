import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()
const app = express();


const connect = ()=>{
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected to mongoDB")).catch((err)=>console.log(err))
}

app.use(cookieParser())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello")
})

const corsOptions = {
    origin: 'https://youtube-mern-front.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'X-Auth-Token', 'Origin', 'Authorization'],
  };
    
app.use(cors(corsOptions))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://youtube-mern-front.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    next();
  });


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)



app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message 
    })
})


app.listen(8800,()=>{
    connect()
    console.log("server is running");
})