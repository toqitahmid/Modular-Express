export interface Response {
  success: boolean;
  message: string;
  data: [];
}
export const createdUserResponse = (result: any) => {
  const response: Response = {
    success: true,
    message: "User created Successfully!",
    data: result.rows[0],
  };
  return response;
};

export const createFailedUserResponse = (error: any) => {
  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
  } else {
    return {
      success: false,
      message: "User didn't create Successfully!",
    };
  }
};
