import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import { clerkMiddleware } from "@clerk/express";
import { rateLimit } from "express-rate-limit";
import tasks from "./routes/task.route";
import subjects from "./routes/subject.route";
import subtasks from "./routes/subtask.route";

const app = express();

app.use(clerkMiddleware());

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET || "pogimozai",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);
// app.use(
//   rateLimit({
//     windowMs: 1000 * 60 * 15,
//     max: 100,
//     message: "Too many requests, please try again later.",
//     statusCode: 429,
//   }),
// );

app.get("/api", (req, res) => {
  res.status(200).send("hello from api!!");
});

// ROUTES ////////////////////////////////////////////////
// ROUTES ////////////////////////////////////////////////
// ROUTES ////////////////////////////////////////////////

app.use("/api/subjects", subjects);
app.use("/api/tasks", tasks);
app.use("/api/subtasks", subtasks);

export default app;
