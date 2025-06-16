import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectMongoDB from "./Lib/Mongodb.js";
import authroute from './Routes/authroute.js'
import customizeroute from './Routes/customizeroute.js'
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use('/api/auth', authroute)

app.use('/api/customize', customizeroute)

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectMongoDB();
});
