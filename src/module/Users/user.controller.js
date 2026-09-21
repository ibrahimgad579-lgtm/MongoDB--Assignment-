import { Router } from "express";
import { deleteUser, getUserById, login, signup, updateUser } from "./user.serves.js";

const userRouter = Router();

userRouter.post("/signup",signup);
userRouter.post("/login", login);
userRouter.patch("/:id",updateUser);
userRouter.delete("/",deleteUser);
userRouter.get("/", getUserById);


export default userRouter