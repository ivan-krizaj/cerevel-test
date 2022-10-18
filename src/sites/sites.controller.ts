import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common';
import { GlobalExceptionFilter } from 'src/validation/http-expection.filter';
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  @UseFilters(new GlobalExceptionFilter())
  create(@Body() createSiteDto: CreateSiteDto) {
    return this.sitesService.create(createSiteDto);
  }

  @Get()
  findAll() {
    return this.sitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sitesService.findOne(id);
  }

  @Patch(':id')
  @UseFilters(new GlobalExceptionFilter())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSiteDto: UpdateSiteDto,
  ) {
    return this.sitesService.update(id, updateSiteDto);
  }

  @Delete(':id')
  @UseFilters(new GlobalExceptionFilter())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sitesService.remove(id);
  }
}
