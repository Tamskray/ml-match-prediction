import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { PrismaService } from '../prisma/prisma.service';
import { clubs as Club } from '@prisma/client';

@Injectable()
export class ClubsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Club[]> {
    return this.prisma.clubs.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const club = await this.prisma.clubs.findUnique({
      where: { id },
    });

    if (!club) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }

    return club;
  }

  async create(dto: CreateClubDto): Promise<Club> {
    return await this.prisma.clubs.create({
      data: dto,
    });
  }
}
