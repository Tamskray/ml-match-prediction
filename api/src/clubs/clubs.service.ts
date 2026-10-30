import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { PrismaService } from '../prisma/prisma.service';
import { clubs as Club } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ClubsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async findAll(): Promise<Club[]> {
    const cacheKey = 'all_clubs';

    const cachedClubs = await this.cache.get<Club[]>(cacheKey);

    if (cachedClubs) {
      console.log('Cache from memory');
      return cachedClubs;
    }

    console.log('NO cache');

    const clubs = this.prisma.clubs.findMany({
      orderBy: { name: 'asc' },
    });

    await this.cache.set(cacheKey, clubs, 30000);

    return clubs;
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
