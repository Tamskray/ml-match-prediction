import { Body, Controller, Post } from '@nestjs/common';
import { MatchesService } from './matches.service';

// class ScheduleDoubleHeaderDto {
//   homeClubId!: string;
//   awayClubId!: string;
// }

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  // @Post('double-header')
  // async scheduleDoubleHeader(@Body() body: ScheduleDoubleHeaderDto) {
  //   return this.matchesService.scheduleDoubleHeader(
  //     body.homeClubId,
  //     body.awayClubId,
  //   );
  // }
}
