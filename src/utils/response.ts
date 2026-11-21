import type { Method } from "./users.interface";

let responseMessage: string;
let data: any;
export interface Response {
  success: boolean;
  message: string;
  data: [];
}
export const successResponse = (result: any, method: Method) => {


  if(method === "POST"){
    responseMessage = "User Created Successfully!";
    data = result.rows[0];
  }
  else if(method === "GET"){
    responseMessage = "Users Retrived Successfully";
    data = result.rows;
  }
  else if(method === "DELETE"){
    responseMessage = "User deleted Successfully";
  }


  const response: Response = {
    success: true,
    message: responseMessage,
    data: data,
  };
  return response;
};

export const FailedResponse = (error: any, method: Method) => {

  if (method === "POST") {
    responseMessage = "User didn't Create Successfully!";
  } else if (method === "GET") {
    responseMessage = "Users didn't Retrive Successfully";
  } else if (method === "DELETE") {
    responseMessage = "User didn't delete Successfully";
  }

  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
  } else {
    return {
      success: false,
      message:responseMessage,
    };
  }
};
