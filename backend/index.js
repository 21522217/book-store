import express from "express";
import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

app.use("/books", booksRoute);

mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log("App connected to database.");
    app.listen(PORT, () => {
      console.log(`App is listening at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database Error: ", error);
  });
