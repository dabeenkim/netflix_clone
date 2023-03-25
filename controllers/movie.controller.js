const MovieService = require("../services/movie.service");
const Joi = require("joi");

class MovieController {
  constructor() {
    this.movieService = new MovieService();
  }
  //전체영상 조회
  allMovies = async (req, res, next) => {
    try {
      const movie = await this.movieService.allMovies();
      res.status(200).json({ movies: movie });
    } catch (error) {
      next(error);
    }
  };

  // 카테고리별 조회
  moviesByCategory = async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await this.movieService.moviesByCategory(categoryId);
      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  };

  //영상 상세조회
  onesMovie = async (req, res, next) => {
    try {
      const { categoryId, movieId } = req.params;
      const findByMovie = await this.movieService.onesMovie(
        categoryId,
        movieId
      );
      res.status(200).json({ movie: findByMovie });
    } catch (error) {
      next(error);
    }
  };

  //찜목록 조회
  savedVideo = async (req, res, next) => {
    try {
      const { saveIdx } = req.params;
      const category = await this.movieService.savedVideo(saveIdx);
      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  };

  //viewRank순 조회
  viewRank = async (req, res, next) => {
    try {
      const { viewRankIdx } = req.params;
      const category = await this.movieService.viewRank(viewRankIdx);
      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  };

  //likeRank순 조회
  likeRank = async (req, res, next) => {
    try {
      const { likeRankIdx } = req.params;
      const category = await this.movieService.likeRank(likeRankIdx);
      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  };

  //viewHistory가 있을때 조회
  viewHistory = async (req, res, next) => {
    try {
      const { viewHistoryIdx } = req.params;
      const category = await this.movieService.viewHistory(viewHistoryIdx);
      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = MovieController;
