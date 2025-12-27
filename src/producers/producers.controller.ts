import { Controller, Get } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { ProducersIntervalsResponseDto } from './dto/producers-intervals-response.dto';

@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Get('intervals')
  getIntervals(): Promise<ProducersIntervalsResponseDto> {
    return this.producersService.getIntervals();
  }
}
