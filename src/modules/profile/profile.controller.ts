import type { Request, Response } from "express";
import { createProfile } from "./profile.service";

const createprofileController = async(req: Request, res: Response) => {
    try{
        const result = await createProfile(req.body);
        res.status(201).json({success: true, message: "Profile created successfully", data: result.rows[0]});
    }
    catch(error){
        res.status(500).json({success: false, message: "Profile didn't create"})
    }
}
export const profileController = {
    createprofileController,
}