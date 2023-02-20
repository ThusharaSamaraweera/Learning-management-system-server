import { USER_ROLES } from "./constants/constants";

export interface NewUser {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  password: string;
  role: USER_ROLES;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  password: string | null;
  role: USER_ROLES;
}

export interface LoginDetails{
  email: string;
  password: string;
}

export interface jwtPayload {
  id: number;
  email: string;
  role: USER_ROLES;
  iat?: number;
  exp?:number
}