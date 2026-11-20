export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
}

export type Method = "GET" | "POST" | "PUT" | "DELETE";