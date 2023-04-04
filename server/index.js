import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Routes
app.use("/api", userRoutes);

const CONNECTION_URL =
  "mongodb+srv://admin:admin@cluster0.bpe22kt.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.port || 5001;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
