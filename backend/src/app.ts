import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import { clerkMiddleware } from "@clerk/express";
import { rateLimit } from "express-rate-limit";
import tasks from "./routes/task.route";
import tags from "./routes/tag.route";
import subtasks from "./routes/subtask.route";
import notes from "./routes/note.route";

const app = express();

app.use(clerkMiddleware());
app.use((req, res, next) => {
  console.log(`${req.method} -- ${req.path}`);
  next();
});
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

app.use("/api/tags", tags);
app.use("/api/tasks", tasks);
app.use("/api/subtasks", subtasks);
app.use("/api/notes", notes);

export default app;
