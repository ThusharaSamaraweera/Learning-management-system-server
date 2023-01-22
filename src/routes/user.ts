import { Router } from 'express';
import userController from '../controllers/userController';

const routes: Router = Router()

routes.post('/signup', userController.createUser)

export default routes