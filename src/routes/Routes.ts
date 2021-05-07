import { Router } from 'express';
import EmployeeController from '../app/controller/EmployeeController';

const routes = Router();

routes.post('/create-employee', EmployeeController.create);

export default routes