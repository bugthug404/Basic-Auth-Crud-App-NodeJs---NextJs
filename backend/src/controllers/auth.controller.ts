import { Router } from "express";
import { signIn, signUp } from "./auth.service";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", signIn);

export default authRouter;
