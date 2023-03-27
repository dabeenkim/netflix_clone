// const express = require("express");
// const router = express.Router();
// const { Content, Like } = require("../models");
// const Boom = require("boom");
// const { Op } = require("sequelize");

// //좋아요
// router.patch("/:profileIdx/:contentIdx", async (req, res, next) => {
//   const { profileIdx, contentIdx } = req.params;
//   const user = res.locals.user;
//   try {
//     const findContent = await Content.findByPk(contentIdx);
//     if (!findContent) {
//       throw Boom.notFound("영화가 존재하지 않습니다.", false);
//     }
//     const likeContent = await Like.findOrCreate({
//       where: {
//         [Op.and]: [{ profileIdx }, { contentIdx }],
//       },
//       defaults: {
//         contentIdx,
//         profileIdx,
//       },
//     }).then(([data, created]) => {
//       if (!created) {
//         data.destroy();
//         return "delete";
//       }
//       return "create";
//     });

//     if (likeContent === "create") {
//       return res.status(200).json({
//         success: true,
//         message: "게시글의 좋아요를 등록하였습니다.",
//       });
//     } else if (likeContent === "delete") {
//       return res.status(200).json({
//         success: true,
//         message: "게시글의 좋아요를 취소하였습니다.",
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// //좋아요 조회
// router.get("/my");

// module.exports = router;
