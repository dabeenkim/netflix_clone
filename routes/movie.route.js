const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const MovieController = require("../controllers/movie.controller");
const movieController = new MovieController();

//전체영상 조회
router.get("/", movieController.allMovies);
// router.get("/", authMiddleware, movieController.allMovies);

//영상 카테고리 전달
router.get("/category", movieController.moviesCategory);

//카테고리별 조회
router.get("/category/:genre", movieController.videosByCategory);
// router.get("/:categoryIdx", authMiddleware, movieController.moviesByCategory);

//영상 상세조회
router.get("/:contentIdx", movieController.onesMovie);
// router.get("/:contentIdx", authMiddleware, movieController.onesMovie);

//찜목록 조회
router.get(
  "/movies/:profileIdx/:contentIdx/:saveIdx",
  authMiddleware,
  movieController.savedVideo
);

// //viewRank순 조회
router.get("/rank/view", movieController.viewRank);
// router.get(
//   "/movies/:contentIdx/:viewRankIndx",
//   authMiddleware,
//   movieController.viewRank
// );

// //likeRank순 조회
router.get("/rank/like", movieController.likeRank);
// router.get(
//   "/movies/:contentIdx/:likeRankIdx",
//   authMiddleware,
//   movieController.likeRank
// );

// //viewHistory가 있을때 조회
router.get("/viewHistory", movieController.viewHistory);
// router.get(
//   "/movies/:contentIdx/:viewHistoryIdx",
//   authMiddleware,
//   movieController.viewHistory
// );

module.exports = router;
