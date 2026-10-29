import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
// import { clubs as Club } from '@prisma/client';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  async getAll() {
    return this.clubsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clubsService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateClubDto) {
    return this.clubsService.create(body);
  }
}
