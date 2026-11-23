import type { Request, Response } from "express";
import { logInUser } from "./auth.service";

export const authController = async(req:Request, res: Response) => {
try {
  const result = await logInUser(req.body);
  res.status(200).json({
    success: true,
    message: "User login successfully!",
    data: result,
  });
} catch (error: any) {
  res.status(500).json({
    success: false,
    message: error?.message,
    error: error,
  });
}
}