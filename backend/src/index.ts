import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

// routes
import userRoute from "./routes/user.route";
import myRestaurantRoute from "./routes/my-restaurant.route";
import restaurantRoute from "./routes/restaurant.route";
import orderRoute from "./routes/order.route";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to database.");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());

// middleware for stripe (validation and security reasons)
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

// server düzgün şekilde kalktı mı diye yapılan sorgulama (convetion)
app.get("/health", (req: Request, res: Response) => {
  res.send({
    message: "health OK!",
  });
});

// routes
app.use("/api/user", userRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.listen(7000, () => {
  console.log("server is running on port 7000");
});
