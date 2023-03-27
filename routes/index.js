const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");

const videoRouter = require("./movie.route");
const likeRouter = require("./like.route");

router.use("/user", userRouter);
router.use("/movies", videoRouter);
// router.use("/likes", likeRouter);

module.exports = router;
