import { pool } from "../../db";
import type { IUser} from "../../utils/users.interface";
import bcrypt from "bcrypt";

export const createUser = async(payload: IUser) => {

    const {name, email, password, age}: IUser = payload
    const SOLT_ROUND = 12;
    const hashPassword = await bcrypt.hash(password, SOLT_ROUND);

    const result = await pool.query(
      `
      INSERT INTO users (name, email, password, age) VALUES ($1,$2,$3,$4) RETURNING*
      `,
      [name, email, hashPassword, age],
    );
    return result
}

export const getUsers = async() => {
  const result = await pool.query(`
    SELECT * FROM users
    `);
  
  return result;
}

export const getUserById = async(id: any) => {
  const result = await pool.query(`
    SELECT * FROM users WHERE id=$1
    `,[id]);
  
  return result;
}

export const deleteUser = async (id: any) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1
    `,
    [id],
  );

  return result;
};