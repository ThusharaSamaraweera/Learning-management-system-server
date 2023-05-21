import { USER_ROLES, USER_STATUS, USER_TITLE } from "./constants/constants";

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
  status: USER_STATUS;
  title: USER_TITLE;
}

export interface LoginDetails{
  email: string;
  password: string;
}

export interface jwtPayload {
  id: number;
  email: string;
  role: USER_ROLES;
  status: USER_STATUS;
  userTitle: USER_TITLE;
  iat?: number;
  exp?:number
}

export interface ICourse {
  id?: string;
  name: string;
  description: string;
  level: COURSE_LEVEL;
  academicYear: ACADEMIC_YEAR;
  faculty: FACULTY;
  department: Department;
  updatedAt?: Date;
}

export enum COURSE_LEVEL {
  LEVEL1 = "LEVEL1",
  LEVEL2 = "LEVEL2",
  LEVEL3 = "LEVEL3",
  LEVEL4 = "LEVEL4",
}

export enum ACADEMIC_YEAR {
  YR_2022_2023 = "2022_2023",
  YR_2023_2024 = "2023_2024",
  YR_2024_2025 = "2024_2025",
}

export enum COURSE_SEMESTERS {
  SEMESTER1 = "SEMESTER1",
  SEMESTER2 = "SEMESTER2",
}

export enum FACULTY {
  COMMERCE_AND_MANAGEMENT_STUDIES = "COMMERCE_AND_MANAGEMENT_STUDIES",
  COMPUTING_AND_TECHNOLOGY = "COMPUTING_AND_TECHNOLOGY",
  HUMANITIES = "HUMANITIES",
  MEDICINE = "MEDICINE",
  SCIENCE = "SCIENCE",
  SOCIAL_SCIENCES = "SOCIAL_SCIENCES",
}

export interface Department{
  id: number;
  name: string;
  faculty: FACULTY;
}

export interface INewCourse {
  name: string;
  description: string;
  level: COURSE_LEVEL;
  academicYear: ACADEMIC_YEAR;
  faculty: FACULTY;
  department: number;
}