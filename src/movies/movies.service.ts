import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import csv from 'csv-parser';
import { join } from 'path';
import { Movie } from './entities/movie.entity';
import { createReadStream } from 'fs';

interface CsvMovieRow {
  year: string;
  title: string;
  studios: string;
  producers: string;
  winner?: string;
}

@Injectable()
export class MoviesService implements OnModuleInit {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('Initializing movies database from CSV');

    const movies = await this.loadMoviesFromCsv();
    await this.saveMovies(movies);

    const count = await this.movieRepository.count();
    this.logger.log(`Movies database initialized with ${count} records`);
  }

  private loadMoviesFromCsv(): Promise<Movie[]> {
    return new Promise((resolve, reject) => {
      const movies: Movie[] = [];
      const filePath = join(process.cwd(), 'src/resources/Movielist.csv');

      createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (row: CsvMovieRow) => movies.push(this.mapRowToMovie(row)))
        .on('end', () => resolve(movies))
        .on('error', reject);
    });
  }

  private mapRowToMovie(row: CsvMovieRow): Movie {
    return this.movieRepository.create({
      year: Number(row.year),
      title: row.title.trim(),
      studios: row.studios,
      producers: row.producers,
      winner: row.winner?.toLowerCase() === 'yes',
    });
  }

  private async saveMovies(movies: Movie[]): Promise<void> {
    if (!movies.length) return;
    await this.movieRepository.save(movies);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findWinners(): Promise<Movie[]> {
    return this.movieRepository.find({ where: { winner: true } });
  }
}
