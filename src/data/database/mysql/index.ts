import { InitMysqlDb } from "./connection";
import { user } from "./Entities/User";
import { Department } from "./Entities/Department";
import { course } from "./Entities/Course";

export { InitMysqlDb as MySQLDbCon, user as UserSchema, Department as DepartmentSchema, course as CourseSchema };
