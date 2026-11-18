import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { BullModule } from '@nestjs/bullmq';
import { MatchProcessor } from './match.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'match-processing',
    }),
  ],
  controllers: [MatchesController],
  providers: [MatchesService, MatchProcessor],
})
export class MatchesModule {}
