import { USER_ROLES } from "./constants/constants";

export interface NewUser {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  password: string;
  role: USER_ROLES;
}
