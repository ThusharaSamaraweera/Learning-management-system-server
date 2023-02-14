import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./utils/errorHandling/errorHandler";

const app = express();
app.use(cors());
express.urlencoded({ extended: true });
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));
app.use("/dev/auth", authRoutes);
app.use(errorHandler.handleRequest);

export default app;
