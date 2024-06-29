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

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
       "*"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
  
    next();
  });


app.use(cors({
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    preflightContinue: true,
}))

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