import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async create(name: string, position: string): Promise<Employee> {
    const createdEmployee = new this.employeeModel({ name, position });
    return createdEmployee.save();
  }

  async deleteById(id: string): Promise<{ deleted: boolean }> {
  const result = await this.employeeModel.deleteOne({ _id: id }).exec();
  return { deleted: result.deletedCount === 1 };
}
}
