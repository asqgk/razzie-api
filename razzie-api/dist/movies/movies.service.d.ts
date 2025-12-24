import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
export declare class MoviesService implements OnModuleInit {
    private readonly movieRepository;
    constructor(movieRepository: Repository<Movie>);
    onModuleInit(): Promise<void>;
    private loadMoviesFromCsv;
    private mapRowToMovie;
    private saveMovies;
    findAll(): Promise<Movie[]>;
    findWinners(): Promise<Movie[]>;
}
