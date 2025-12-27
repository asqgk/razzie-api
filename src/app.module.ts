import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/entities/movie.entity';
import { ProducersModule } from './producers/producers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      autoSave: false,
      entities: [Movie],
      synchronize: true,
    }),
    MoviesModule,
    ProducersModule,
  ],
})
export class AppModule {}
