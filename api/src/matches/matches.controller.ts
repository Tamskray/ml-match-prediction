import { Body, Controller, Get, Post } from '@nestjs/common';
import { MatchesService } from './matches.service';

// class ScheduleDoubleHeaderDto {
//   homeClubId!: string;
//   awayClubId!: string;
// }

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  async getAll() {
    return this.matchesService.findAll();
  }

  @Get('with-clubs')
  async getAllWithClubs() {
    return this.matchesService.findAllWithClubs();
  }

  // @Post('double-header')
  // async scheduleDoubleHeader(@Body() body: ScheduleDoubleHeaderDto) {
  //   return this.matchesService.scheduleDoubleHeader(
  //     body.homeClubId,
  //     body.awayClubId,
  //   );
  // }
}
