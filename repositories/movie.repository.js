const { Content } = require("../models");

class MovieRepository extends Content {
  constructor() {
    super();
  }
  //전체영상 조회
  FindAll = async () => {
    const findMovies = await Content.findAll({
      attributes: ["contentIdx", "name", "videoUrl", "videoThumUrl"],
    });
    return findMovies;
  };

  //카테고리별 조회
  moviesByCategory = async (categoryId) => {
    const findCategory = await Content.findOne({
      where: { categoryId },
      attributes: [
        "movieId",
        "categoryId",
        "title",
        "movieUrl",
        "desc",
        "playtime",
      ],
    });
    return findCategory;
  };

  //영상 상세조회
  FindOne = async (categoryId, movieId) => {
    const findOnesMovie = await Content.findOne({
      where: { categoryId },
      attributes: [
        "movieId",
        "categoryId",
        "title",
        "movieUrl",
        "genre",
        "actor",
        "desc",
        "playtime",
      ],
    });
    return findOnesMovie;
  };

  //찜목록 조회
  savedVideo = async (saveIdx) => {
    const findMovies = await Content.savedVideo({
      attributes: ["contentIdx", "name", "videoUrl", "videoThumUrl"],
    });
    return findMovies;
  };

  //viewRank순 조회
  viewRank = async (viewRankIdx) => {
    const findMovies = await Content.viewRank({
      attributes: ["contentIdx", "name", "videoUrl", "videoThumUrl"],
    });
    return findMovies;
  };

  //likeRank순 조회
  likeRank = async (likeRankIdx) => {
    const findMovies = await Content.likeRank({
      attributes: ["contentIdx", "name", "videoUrl", "videoThumUrl"],
    });
    return findMovies;
  };

  //viewHistory가 있을때 조회
  viewHistory = async (viewHistoryIdx) => {
    const findMovies = await Content.viewHistory({
      attributes: ["contentIdx", "name", "videoUrl", "videoThumUrl"],
    });
    return findMovies;
  };
}

module.exports = MovieRepository;
