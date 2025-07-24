import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

import { EmployeesService } from './employees.service';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

class CreateEmployeeDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    return this.employeesService.deleteById(id);
  }
}
