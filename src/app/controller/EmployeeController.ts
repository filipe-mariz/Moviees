import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Employee from '../model/Employee';
import employeeView from '../view/EmployeeView';
import * as Yup from 'yup'

export default {
  async create(request: Request, response: Response) {
    const {
      name,
      level_authorization,
      user_name,
      password,
      passwordConfirmation
    } = request.body;

    const employeeRepository = await getRepository(Employee);
    
    const userExist = await employeeRepository.findOne({ where: { user_name }})
    if (userExist) {
      return response.status(402).json({ 
        message: "This user name is in use",
        solution: "Chose other user name" 
      })
    }
    if(password != passwordConfirmation) {
      return response.status(402).json({ 
        message: "Passwords do not match",
        solution: "Put exactly the same password in the confirmation" 
      })
    }

    const data = {
      name,
      level_authorization,
      user_name,
      password,
      passwordConfirmation
    }

    const schemma = Yup.object().shape({
      name: Yup.string().required(),
      level_authorization: Yup.number().required(),
      user_name: Yup.string().required(),
      password: Yup.string().required(),
      passwordConfirmation: Yup.string().required(),
    })

    await schemma.validate(data, {
      abortEarly: false
    })

    const employee = employeeRepository.create(data);
    await employeeRepository.save(employee);

    return response.status(200).json({
      message: "employee created"
    })
  },

  async viewOne(request: Request, response: Response) {
    const { id } = request.params

    const employee = await getRepository(Employee).findOneOrFail(id);

    return response.status(200).json(employeeView.Render(employee))
  },

  async viewAll(request: Request, response: Response) {
    const employeeRepository = getRepository(Employee);

    const employee = await employeeRepository.find();

    return response.status(200).json(employeeView.renderMany(employee))
  },

  async destroy(request: Request, response: Response) {
    const results = await getRepository(Employee).delete(request.params.id)

    return response.status(200).json({ message: 'User deleted'});
  }
}