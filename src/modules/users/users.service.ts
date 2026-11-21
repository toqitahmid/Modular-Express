import { pool } from "../../db";
import type { IUser, Method } from "../../utils/users.interface";

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