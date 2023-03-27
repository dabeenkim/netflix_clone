const {
  Content,
  Participant,
  Category,
  Save,
  ViewRank,
  LikeRank,
  CommonCodes,
} = require("../models");
const { Op } = require("sequelize");

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

  //영상 카테고리 전달
  FindCategoty = async () => {
    const findCategory = await CommonCodes.findAll({
      attributes: ["codeValue", "codeName"],
    });
    return findCategory;
  };

  //카테고리별 조회
  videosByCategory = async (genre) => {
    console.log(genre);
    const findGenre = await CommonCodes.findOne({
      where: { codeUseColum: "genre", codeValue: genre },
      attributes: ["codename"],
    });
    console.log(findGenre);

    if (!findGenre) {
      throw new Error(`No matching genre: ${genre}`);
    }

    const findCategory = await Content.findAll({
      attributes: ["name", "videoUrl", "videoThumUrl", "contentIdx"],
    });

    return { findGenre, findCategory };
  };

  //영상 상세조회
  FindOne = async (contentIdx) => {
    const findOnesMovie = await Content.findOne({
      where: { contentIdx },
      attributes: [
        "contentIdx",
        "name",
        "videoUrl",
        "class",
        "videoThumUrl",
        "Categories.genre", //여기서 불러올때는 데이터베이스의 이름과 동일해야함
        "Participants.person",
        "desc",
        "playtime",
        "status",
      ],
      raw: true,
      include: [
        {
          model: Category,
          attributes: [],
        },
        {
          model: Participant,
          attributes: [],
        },
      ],
    });
    return findOnesMovie;
  };

  //찜목록 조회
  savedVideo = async (saveIdx, contentIdx, profileIdx) => {
    const findMovies = await Content.findAll({
      raw: true,
      where: { contentIdx },
      attributes: ["contentIdx", "name", "videoUrl", "videoThumUrl"],
      include: [
        {
          model: Save,
          where: {
            [Op.and]: [{ saveIdx }, { profileIdx }],
          },
          attributes: [], // 추가한 옵션
        },
      ],
    });
    return findMovies;
  };

  //viewRank순 조회
  viewRank = async (viewRankIdx, contentIdx) => {
    console.log(viewRankIdx);
    const findMovies = await Content.findAll({
      raw: true,
      where: { contentIdx },
      attributes: ["contentIdx", "name", "videoUrl", "videoThumUrl"],
      limit: 10,
      include: [
        {
          model: ViewRank,
          where: {
            [Op.and]: [{ viewRankIdx }, { contentIdx }],
          },
          attributes: [], //값을 설정해주지않으면 viewRank의 모든 값이나오게된다.
        },
      ],
    });
    return findMovies;
  };

  //likeRank순 조회
  likeRank = async (likeRankIdx, contentIdx) => {
    const findMovies = await Content.findAll({
      raw: true,
      where: { contentIdx },
      attributes: ["contentIdx", "name", "videoUrl", "videoThumUrl"],
      limit: 10,
      include: [
        {
          model: LikeRank,
          where: {
            [Op.and]: [{ likeRankIdx }, { contentIdx }],
          },
        },
      ],
    });
    return findMovies;
  };

  //viewHistory가 있을때 조회
  viewHistory = async (viewHistoryIdx, contentIdx) => {
    const findMovies = await Content.findAll({
      raw: true,
      where: { contentIdx },
      attributes: ["contentIdx", "name", "videoUrl", "videoThumUrl"],
      limit: 10,
      include: [
        {
          model: this.viewHistory,
          where: {
            [Op.and]: [{ contentIdx }, { viewHistoryIdx }],
          },
        },
      ],
    });
    return findMovies;
  };
}

module.exports = MovieRepository;
