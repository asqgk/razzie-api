import { ProducerIntervalDto } from './producer-interval.dto';

export interface ProducersIntervalsResponseDto {
  min: ProducerIntervalDto[];
  max: ProducerIntervalDto[];
}
