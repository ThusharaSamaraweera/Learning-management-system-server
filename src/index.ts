import express from "express";
import cors from "cors";
import userRoute from "./routes/user";
import { errorHandler } from "./utils/errorHandling/errorHandler";

const app = express();
app.use(cors());
express.urlencoded({ extended: true });
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));
app.use("/dev/users", userRoute);
app.use(errorHandler.handleRequest);

export default app;
