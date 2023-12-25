import { Router } from "express";
import { addUser, deleteUser, editUser, getAllUsers } from "./user.service";

const userController = Router();

userController.get("/list", getAllUsers);
userController.delete("/delete/:id", deleteUser);
userController.put("/edit/:id", editUser);
userController.post("/add", addUser);

export default userController;
