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
import { TrialsService } from './trials.service';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';

@Controller('trials')
export class TrialsController {
  constructor(private readonly trialsService: TrialsService) {}

  @Post()
  @UseFilters(new GlobalExceptionFilter())
  create(@Body() createTrialDto: CreateTrialDto) {
    return this.trialsService.create(createTrialDto);
  }

  @Get()
  findAll() {
    return this.trialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trialsService.findOne(id);
  }

  @Patch(':id')
  @UseFilters(new GlobalExceptionFilter())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrialDto: UpdateTrialDto,
  ) {
    return this.trialsService.update(id, updateTrialDto);
  }

  @Delete(':id')
  @UseFilters(new GlobalExceptionFilter())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.trialsService.remove(id);
  }
}
