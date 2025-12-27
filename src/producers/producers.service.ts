import { Injectable, Logger } from '@nestjs/common';
import { MoviesService } from '../movies/movies.service';
import { ProducersIntervalsResponseDto } from './dto/producers-intervals-response.dto';
import { ProducerIntervalDto } from './dto/producer-interval.dto';

@Injectable()
export class ProducersService {
  private readonly logger = new Logger(ProducersService.name);

  constructor(private readonly moviesService: MoviesService) {}

  async getIntervals(): Promise<ProducersIntervalsResponseDto> {
    this.logger.debug('Calculating producers awards intervals');

    const winners = await this.moviesService.findWinners();

    const producersMap = new Map<string, number[]>();
    for (const movie of winners) {
      const producers = movie.producers.split(/,| and /).map((p) => p.trim());

      for (const producer of producers) {
        let years = producersMap.get(producer);
        if (!years) {
          years = [];
          producersMap.set(producer, years);
        }

        years.push(movie.year);
      }
    }

    const intervals: ProducerIntervalDto[] = [];
    for (const [producer, years] of producersMap.entries()) {
      if (years.length < 2) continue;

      const sortedYears = [...years].sort((a, b) => a - b);

      for (let i = 1; i < sortedYears.length; i++) {
        intervals.push({
          producer,
          interval: sortedYears[i] - sortedYears[i - 1],
          previousWin: sortedYears[i - 1],
          followingWin: sortedYears[i],
        });
      }
    }

    if (intervals.length === 0) {
      return { min: [], max: [] };
    }

    const minInterval = Math.min(...intervals.map((i) => i.interval));
    const maxInterval = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === minInterval),
      max: intervals.filter((i) => i.interval === maxInterval),
    };
  }
}
