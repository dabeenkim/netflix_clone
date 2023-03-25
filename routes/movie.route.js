const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const MovieController = require("../controllers/movie.controller");
const movieController = new MovieController();

//전체영상 조회
router.get("/movies", authMiddleware, movieController.allMovies);

//카테고리별 조회
router.get(
  "/movies/:categoryIdx",
  authMiddleware,
  movieController.moviesByCategory
);

//영상 상세조회
router.get("/movies/:contentIdx", authMiddleware, movieController.onesMovie);

//찜목록 조회
router.get("/movies/:saveIdx", authMiddleware, movieController.savedVideo);

//viewRank순 조회
router.get("/movies/viewRankIndx", authMiddleware, movieController.viewRank);

//likeRank순 조회
router.get("/movie/likeRankIdx", authMiddleware, movieController.likeRank);

//viewHistory가 있을때 조회
router.get(
  "/movie/viewHistroyIdx",
  authMiddleware,
  movieController.viewHistory
);

module.exports = router;
