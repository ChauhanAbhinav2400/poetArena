import { LogIn } from "lucide-react";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const loginUser = (userdata: any) => {
  return {
    type: LOGIN,
    payload: userdata,
  };
};

export const logOutUser = (userdata: any) => {
  return {
    type: LOGOUT,
    payload: userdata,
  };
};
