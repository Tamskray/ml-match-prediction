import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
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

  @Post(':id/simulate')
  async simulate(@Param('id', ParseUUIDPipe) id: string) {
    return this.matchesService.simulateMatch(id);
  }

  // @Post('double-header')
  // async scheduleDoubleHeader(@Body() body: ScheduleDoubleHeaderDto) {
  //   return this.matchesService.scheduleDoubleHeader(
  //     body.homeClubId,
  //     body.awayClubId,
  //   );
  // }
}
