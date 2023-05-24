import { DepartmentSchema } from "../data/database/mysql";
import { AppDataSource } from "../data/database/mysql/connection";
import { BadRequestError } from "../utils/errorHandling/ErrorResponse";
import { Logger } from "../utils/logger/logger";

export const getDepartment = async (logger: Logger, departmentId: number) => {
  const departmentRepo = AppDataSource.getRepository(DepartmentSchema);
  let department;
  try {
    department = await departmentRepo.findOne({
      where: {
        id: departmentId,
      },
    });
  } catch (error) {
    logger.info({ message: `Error while getting department with id ${departmentId}` });
  }

  if (!department) {
    logger.error({ message: `Department with id ${departmentId} not found` });
    throw new BadRequestError("Department not found", "");
  }

  return department;
};

export default { getDepartment };
