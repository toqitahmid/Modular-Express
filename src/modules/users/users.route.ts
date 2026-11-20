import { Router } from "express";
import { userController } from "./users.controller";

const router = Router();

router.post("/", userController.createUserController)


export const userRouter = router