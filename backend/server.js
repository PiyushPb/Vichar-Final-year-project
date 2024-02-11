import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

const app = express();
dotenv.config();

const serverPort = process.env.SERVER_PORT || 3000;

const corsOptions = {
  origin: true,
};
app.use(express.json());

try {
  await mongoose.connect(process.env.MONGODB_URL, { dbName: "users" });
  console.log("MongoDB connected");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/v1/auth/", authRoutes); // localhost:8000/v1/auth

app.listen(serverPort || 3000, () =>
  console.log(`Server running on port ${serverPort}`)
);
