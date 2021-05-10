import { Router } from 'express';
import EmployeeController from '../app/controller/EmployeeController';
import LoginController from '../app/controller/LoginController';
import authMiddleware from '../app/middleware/AuthMiddleware';
import bossMiddleware from '../app/middleware/BossMiddleware';

const employ = Router();

employ.post('/employee/login', LoginController.login);
employ.post('/employee', bossMiddleware, EmployeeController.create);
employ.get('/employee', authMiddleware, EmployeeController.viewAll);
employ.get('/employee/:id', authMiddleware, EmployeeController.viewOne);
employ.delete('/employee/:id', bossMiddleware, EmployeeController.destroy);

export default employ;
