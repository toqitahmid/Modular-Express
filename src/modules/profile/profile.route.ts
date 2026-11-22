import { Router } from "express";
import { profileController } from "./profile.controller";


const route = Router();

route.post("/", profileController.createprofileController)


export const profileRoute = route;