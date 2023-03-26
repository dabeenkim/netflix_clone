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
  videosByCategory = async (contentIdx) => {
    if (!contentIdx) {
      throw Boom.notFound("영화가 존재하지 않습니다.", false);
    }
    const movieClass = await this.movieRepository.videosByCategory(
      contentIdx,
      contentIdx.class === 1
    );
    const dramaClass = await this.movieRepository.videosByCategory(
      contentIdx,
      contentIdx.class === 2
    );

    const videoList = { movie: movieClass, drama: dramaClass };

    return videoList;
  };

  //영상 상세조회
  onesMovie = async (contentIdx) => {
    const movie = await this.movieRepository.FindOne(contentIdx);
    if (!movie) {
      throw Boom.notFound("영상이 존재하지 않습니다.", false);
    }
    return movie;
  };

  //찜목록 조회
  savedVideo = async (saveIdx, contentIdx, profileIdx) => {
    const category = await this.movieRepository.savedVideo(
      saveIdx,
      contentIdx,
      profileIdx
    );
    if (!category) {
      throw Boom.notFound("카테고리가 존재하지 않습니다.", false);
    }
    return category;
  };

  //viewRank순 조회
  viewRank = async (viewRankIdx, contentIdx) => {
    const category = await this.movieRepository.viewRank(
      viewRankIdx,
      contentIdx
    );
    if (!category) {
      throw Boom.notFound("카테고리가 존재하지 않습니다.", false);
    }
    return category;
  };

  //likeRank순 조회
  likeRank = async (likeRankIdx, contentIdx) => {
    const category = await this.movieRepository.likeRank(
      likeRankIdx,
      contentIdx
    );
    if (!category) {
      throw Boom.notFound("카테고리가 존재하지 않습니다.", false);
    }
    return category;
  };

  //viewHistory가 있을때 조회
  viewHistory = async (viewHistoryIdx, contentIdx) => {
    const category = await this.movieRepository.viewHistory(
      viewHistoryIdx,
      contentIdx
    );
    if (!category) {
      throw Boom.notFound("카테고리가 존재하지 않습니다.", false);
    }
    return category;
  };
}

module.exports = MovieService;
