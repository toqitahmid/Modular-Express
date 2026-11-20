import dotenv from "dotenv";
import path from 'path';

dotenv.config({
  path: path.join(path.join(process.cwd()), ".env"),
});

export const config = {
  PORT: process.env.PORT,
  POOL_STRING: process.env.POOL_STRING,
};