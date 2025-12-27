import { Module } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { MoviesModule } from '../movies/movies.module';
import { ProducersController } from './producers.controller';

@Module({
  imports: [MoviesModule],
  controllers: [ProducersController],
  providers: [ProducersService],
})
export class ProducersModule {}
