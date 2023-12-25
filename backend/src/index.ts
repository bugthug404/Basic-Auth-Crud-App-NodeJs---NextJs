import express from "express";
import Cors from "cors";
import mongoose from "mongoose";
import { authRequest } from "./middleware/auth-request";
import * as dotenv from "dotenv";
import authRouter from "./controllers/auth.controller";
import userController from "./controllers/user.controller";
import { MySQLDatabase } from "./utils/db";

dotenv.config();
mongoose.set("strictQuery", false);
const app = express();
const port = process.env.PORT;
app.use(
  Cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());

const connect = new MySQLDatabase();
connect.connect();

app.get("/", (req, res) =>
  res.status(200).send({
    data: `server says : get request on time : ${new Date().getTime()}`,
  })
);

app.use("/", authRouter);
app.use("/user", authRequest, userController);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
