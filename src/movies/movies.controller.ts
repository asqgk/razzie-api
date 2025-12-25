import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { ProducersIntervalsResponseDto } from './dto/producers-intervals-response.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get('producers/intervals')
  async getProducersIntervals(): Promise<ProducersIntervalsResponseDto> {
    return this.moviesService.getProducersIntervals();
  }
}
