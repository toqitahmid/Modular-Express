import type { Request, Response } from "express";
import { createUser, deleteUser, getUserById, getUsers } from "./users.service";
import { successResponse, FailedResponse } from "../../utils/response";
import type { Method } from "../../utils/users.interface";



let method: Method;


const createUserController = async (req: Request, res: Response) => {
  try {
    const result = await createUser(req.body);

    method = "POST";
    res.status(201).json(successResponse(result,method));
  } 
  catch (error) {
    FailedResponse(error, method);
  }
};

const getUserController = async(req: Request, res: Response) => {
  try{
    method = "GET"
    const result = await getUsers();
    res.status(200).json(successResponse(result, method));
  }
  catch(error){
    FailedResponse(error, method);
  }
}

const getUserByIdController = async(req: Request, res: Response) => {
  try{
    const id  = req.params.id;
    method = "GET"
    const result = await getUserById(id);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json(successResponse(result, method));
  }
  catch(error){
    FailedResponse(error, method);
  }
}

const deleteUserController = async(req: Request, res: Response) => {
  try{
    const id  = req.params.id;
    method = "DELETE"
    const result = await deleteUser(id);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found to delete!",
      });
    }
    res.status(200).json(successResponse(result, method));
  }
  catch(error){
    FailedResponse(error, method);
  }
}


export const userController = {
  createUserController,
  getUserController,
  getUserByIdController,
  deleteUserController,
};