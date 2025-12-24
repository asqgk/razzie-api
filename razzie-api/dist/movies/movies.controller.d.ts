import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(): Promise<Movie[]>;
    findWinners(): Promise<Movie[]>;
}
