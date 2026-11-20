import type { Request, Response } from "express";
import { createUser } from "./users.service";
import { createdUserResponse, createFailedUserResponse } from "../../utils/response";

const createUserController = async (req: Request, res: Response) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json(createdUserResponse(result));
  } 
  catch (error) {
    createFailedUserResponse(error);
  }
};


export const userController = {
    createUserController,
}