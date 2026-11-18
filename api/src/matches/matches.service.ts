import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class MatchesService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('match-processing') private readonly matchQueue: Queue,
  ) {}

  async findAll() {
    return this.prisma.matches.findMany({
      orderBy: { match_date: 'asc' },
    });
  }

  async findAllWithClubs() {
    return this.prisma.matches.findMany({
      orderBy: { match_date: 'asc' },
      include: {
        home_club: true,
        away_club: true,
      },
    });
  }

  async simulateMatch(matchId: string) {
    const match = await this.prisma.matches.findUnique({
      where: { id: matchId },
    });

    if (!match) throw new Error(`Match ${matchId} not found`);

    console.log(`[Producer] Adding job to queue for match: ${matchId}`);

    const job = await this.matchQueue.add(
      'finish-match',
      { matchId },
      { delay: 5000 },
    );

    return { message: 'Match simulation queued', jobId: job.id };
  }

  // async scheduleDoubleHeader(homeClubId: string, awayClubId: string) {
  //   try {
  //     await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
  //       console.log('Attempting to create Match 1...');
  //       const match1 = await tx.matches.create({
  //         data: {
  //           home_club_id: homeClubId,
  //           away_club_id: awayClubId,
  //           match_date: new Date('2027-05-01T15:00:00Z'),
  //           status: 'SCHEDULED',
  //         },
  //       });
  //       console.log('Match 1 created in transaction memory:', match1.id);

  //       // 2. SIMULATE A FATAL SERVER ERROR
  //       // Imagine the server crashes here before the second match is created
  //       throw new Error('Database connection lost!');

  //       // 3. This code will never run
  //       const match2 = await tx.matches.create({
  //         data: {
  //           home_club_id: awayClubId, // Swapped for the away leg
  //           away_club_id: homeClubId,
  //           match_date: new Date('2027-05-15T15:00:00Z'),
  //           status: 'SCHEDULED',
  //         },
  //       });
  //     });
  //   } catch (error) {
  //     const message = error instanceof Error ? error.message : String(error);
  //     console.error('Transaction Failed! Rolling back database...', message);
  //     throw new InternalServerErrorException('Failed to schedule matches');
  //   }
  // }
}
