import { AppDataSource, InitMysqlDb } from "../config/database/connection";
import { UserSchema } from "../config/database/index";
import { NewUser } from "../modules";

async function create(user: NewUser) {
    try {
        await InitMysqlDb()
        const userRepo = AppDataSource.getRepository(UserSchema)
        userRepo.insert(user)
    } catch (error) {
        console.log(error)
    }
}

export default {
    create
}