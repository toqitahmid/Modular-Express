import { Router } from "express";
import { userController } from "./users.controller";

const router = Router();

router.post("/", userController.createUserController)
router.get("/", userController.getUserController)


export const userRouter = router