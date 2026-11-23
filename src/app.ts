import express, { type Application, type Request, type Response } from "express";
import { userRouter } from "./modules/users/users.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";

const app: Application = express();
app.use(express.json());


app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/auth", authRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("This is Modular Express Server")
})

export default app;