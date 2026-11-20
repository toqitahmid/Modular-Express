import { pool } from "../../db";
import type { IUser } from "../../utils/users.interface";

export const createUser = async(payload: IUser) => {

    const {name, email, password, age}: IUser = payload
    const result = await pool.query(
      `
      INSERT INTO users (name, email, password, age) VALUES ($1,$2,$3,$4) RETURNING*
      `,
      [name, email, password, age],
    );
    return result
}