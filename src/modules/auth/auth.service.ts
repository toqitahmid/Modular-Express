import { pool } from "../../db";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const logInUser = async(payload:{email: string, password: string}) => {
    const {email, password} = payload;
    const user = await pool.query(
        `SELECT * FROM users WHERE email=$1
        `,
        [email]
    )
    if(user.rowCount === 0){
        throw new Error("Invalid credentials!!");
    }

    const matchPassword = await bcrypt.compare(password,user.rows[0].password)

    if(!matchPassword){
        throw new Error("Invalid credentials!!");
    }

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
    }

    const accessToken = jwt.sign(jwtPayload, "asfdfawerwafsaf", {expiresIn: "1d"});

    return {accessToken, user: user.rows[0]};
}