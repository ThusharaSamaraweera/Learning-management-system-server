import { NextFunction } from "express"
import { COURSE_SERVICE } from "../constants/logConstants"
import { Logger } from "../utils/logger/logger"
import { apiResponse } from "../utils/successResponse"

const createCourse = (req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger(COURSE_SERVICE)

    try {
        logger.info({message: 'Calling POST course'})
        const course = Promise.resolve({name: 'test', description: 'test', level: 'test', academicYear: 'test', faculty: 'test', department: 'test'})

        return  'success'
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export default { createCourse }