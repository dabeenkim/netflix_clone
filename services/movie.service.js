const MovieRepository = require("../repositories/movie.repository");
const Boom = require("boom");

class MovieService {
  constructor() {
    this.movieRepository = new MovieRepository();
  }
  //전체영상 조회
  allMovies = async () => {
    const movie = await this.movieRepository.FindAll();
    return movie;
  };

  //카테고리별 조회
  moviesByCategory = async (categoryId) => {
    const category = await this.movieRepository.moviesByCategory(categoryId);
    if (!category) {
      throw Boom.notFound("카테고리가 존재하지 않습니다.", false);
    }
    return category;
  };

  //영상 상세조회
  onesMovie = async (categoryId, movieId) => {
    const movie = await this.movieRepository.FindOne(categoryId, movieId);
    if (!movie) {
      throw Boom.notFound("영상이 존재하지 않습니다.", false);
    }
    return movie;
  };

  //찜목록 조회
  savedVideo = async (saveIdx) => {
    const category = await this.movieRepository.savedVideo(saveIdx);
    if (!category) {
      throw Boom.notFound("카테고리가 존재하지 않습니다.", false);
    }
    return category;
  };

  //viewRank순 조회
  viewRank = async (viewRankIdx) => {
    const category = await this.movieRepository.viewRank(viewRankIdx);
    if (!category) {
      throw Boom.notFound("카테고리가 존재하지 않습니다.", false);
    }
    return category;
  };

  //likeRank순 조회
  likeRank = async (likeRankIdx) => {
    const category = await this.movieRepository.likeRank(likeRankIdx);
    if (!category) {
      throw Boom.notFound("카테고리가 존재하지 않습니다.", false);
    }
    return category;
  };

  //viewHistory가 있을때 조회
  viewHistory = async (viewHistoryIdx) => {
    const category = await this.movieRepository.viewHistory(viewHistoryIdx);
    if (!category) {
      throw Boom.notFound("카테고리가 존재하지 않습니다.", false);
    }
    return category;
  };
}

module.exports = MovieService;
