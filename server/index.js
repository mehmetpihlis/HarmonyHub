import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import postRouter from "./router/postRouter.js";
import userRouter from "./router/userRouter.js";

// Dotenv Configuration
dotenv.config();

// Create Server
const app = express();

// Middlewares
app.use(cors());
app.use(express.json({
  limit: "20mb"
}));
// Add Route
app.use("/posts", postRouter);
app.use("/users", userRouter);



// Post Listening
app.listen(process.env.PORT, () => {
  console.log("Port Dinleniyor...".bgBlack.green);  
  mongoose
    .connect(process.env.MONGO_CONNECTION_STR)
    .then(() =>
      console.log("Veritabanına Başarılı Bir Şekilde Bağlanıldı".bgGreen.black)
    )
    .catch((err) => console.log(err.message));
});
