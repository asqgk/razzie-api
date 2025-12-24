"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const csv_parser_1 = __importDefault(require("csv-parser"));
const path_1 = require("path");
const movie_entity_1 = require("./entities/movie.entity");
const fs_1 = require("fs");
let MoviesService = class MoviesService {
    movieRepository;
    constructor(movieRepository) {
        this.movieRepository = movieRepository;
    }
    async onModuleInit() {
        const movies = await this.loadMoviesFromCsv();
        await this.saveMovies(movies);
    }
    loadMoviesFromCsv() {
        return new Promise((resolve, reject) => {
            const movies = [];
            const filePath = (0, path_1.join)(process.cwd(), 'src/resources/movielist.csv');
            (0, fs_1.createReadStream)(filePath)
                .pipe((0, csv_parser_1.default)({ separator: ';' }))
                .on('data', (row) => movies.push(this.mapRowToMovie(row)))
                .on('end', () => resolve(movies))
                .on('error', reject);
        });
    }
    mapRowToMovie(row) {
        return this.movieRepository.create({
            year: Number(row.year),
            title: row.title.trim(),
            studios: row.studios,
            producers: row.producers,
            winner: row.winner?.toLowerCase() === 'yes',
        });
    }
    async saveMovies(movies) {
        if (!movies.length)
            return;
        await this.movieRepository.save(movies);
    }
    async findAll() {
        return this.movieRepository.find();
    }
    async findWinners() {
        return this.movieRepository.find({ where: { winner: true } });
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MoviesService);
//# sourceMappingURL=movies.service.js.map