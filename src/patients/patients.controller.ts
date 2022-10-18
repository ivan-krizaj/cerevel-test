import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { GlobalExceptionFilter } from 'src/validation/http-expection.filter';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @UseFilters(new GlobalExceptionFilter())
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  @UseFilters(new GlobalExceptionFilter())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @UseFilters(new GlobalExceptionFilter())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.remove(id);
  }
}
