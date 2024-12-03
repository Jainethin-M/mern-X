
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import cors from "cors"

import authRoute from "./routes/auth_route.js"
import userRoute from "./routes/user_route.js"
import postRoute from "./routes/post_route.js"
import notifyRoute from "./routes/notify_route.js"
import connectdb from "./db/connectDB.js"
import path from 'path';





const app = express();
dotenv.config();
const PORT = process.env.PORT;

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET_KEY
});

app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))

app.use(express.urlencoded({
    extended : true
}))

app.use(express.json({
    limit : "100kb"
}));

app.use(cookieParser());

const __dirname = path.resolve();


app.use("/api/auth" , authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/notifications", notifyRoute)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.use("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
    connectdb();
})