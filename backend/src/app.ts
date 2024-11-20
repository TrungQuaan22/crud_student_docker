import express from "express";
import bodyParser from "body-parser";
import studentRoutes from "./routes/studentRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/api/students", studentRoutes);

export default app;
