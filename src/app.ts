import express, { type Application, type Request, type Response } from "express";
import { userRouter } from "./modules/users/users.route";

const app: Application = express();
app.use(express.json());


app.use("/api/v1/users", userRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("This is Modular Express Server")
})

export default app;