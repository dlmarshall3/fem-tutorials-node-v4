import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./router";
import { protect } from "./modules/auth/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  console.log("yeeeee");
  res.json({ message: "hello" });
  res.end();
});

app.use("/api", protect, router);
app.post('/user', createNewUser);
app.post('/signin', signIn);

export default app;
