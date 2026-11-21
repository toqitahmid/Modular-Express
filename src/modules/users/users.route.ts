import { Router } from "express";
import { userController } from "./users.controller";

const router = Router();

router.post("/", userController.createUserController)
router.get("/", userController.getUserController)
router.get("/:id", userController.getUserByIdController)
router.delete("/:id", userController.deleteUserController)


export const userRouter = router