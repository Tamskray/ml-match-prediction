import { Processor, WorkerHost } from '@nestjs/bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { Job } from 'bullmq';
import { MatchStatus } from '../common/enums/match-status.enum';

@Processor('match-processing')
export class MatchProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<{ matchId: string }>): Promise<void> {
    const { matchId } = job.data;

    console.log(
      `[Processor] Processing job "${job.name}" for match: ${matchId}`,
    );

    if (job.name === 'finish-match') {
      const homeScore = Math.floor(Math.random() * 5);
      const awayScore = Math.floor(Math.random() * 4);

      await this.prisma.matches.update({
        where: { id: matchId },
        data: {
          status: MatchStatus.FINISHED,
          home_score: homeScore,
          away_score: awayScore,
        },
      });
      console.log(
        `[Processor] Match ${matchId} finished: ${homeScore} - ${awayScore}`,
      );
    }
  }
}
