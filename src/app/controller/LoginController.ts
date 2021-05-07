import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import Employee from '../model/Employee';

export default {
  async login(request: Request, response: Response) {
    const employeeRepository = getRepository(Employee);
    const {
      user_name,
      password
    } = request.body

    const employee = await employeeRepository.findOne({ where: { user_name }});
    if (!employee) {
      return response.status(401).json({ message: 'User not found' });
    }

    const passwordCheck = await bcrypt.compare(password, employee.password);
    if (!passwordCheck) {
      return response.status(401).json({ message: 'This password is not match'});
    }

    const token = jwt.sign({ id: employee.id }, process.env.TOKEN, {expiresIn: '1d'} );

    return response.status(200).json({            
      message: "User successfully logged in",
      token
    });
  }
}