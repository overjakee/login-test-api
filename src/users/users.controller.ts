import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { EmployeesService } from '../employees/employees.service';
import { JwtAuthGuard } from '../employees/common/guards/jwt-auth.guard';

class CreateEmployeeDto {
  name: string;
  position: string;
}

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getEmployees() {
    return this.employeesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async createEmployee(@Body() body: CreateEmployeeDto) {
    return this.employeesService.create(body.name, body.position);
  }
}
