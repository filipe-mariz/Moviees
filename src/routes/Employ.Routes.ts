import { Router } from 'express';
import EmployeeController from '../app/controller/EmployeeController';
import LoginController from '../app/controller/LoginController';
import authMiddleware from '../app/middleware/AuthMiddleware';

const employ = Router();

employ.post('/employee/login', LoginController.login);
employ.post('/employee', EmployeeController.create);
employ.get('/employee', authMiddleware, EmployeeController.viewAll);
employ.get('/employee/:id', authMiddleware, EmployeeController.viewOne);
employ.delete('/employee/:id', authMiddleware, EmployeeController.destroy);

export default employ;