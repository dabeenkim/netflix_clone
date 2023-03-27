const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");

const videoRouter = require("./movie.route");
const likeRouter = require("./like.route");
const profileRouter = require("./profile.route");

router.use("/user", userRouter);
router.use("/movies", videoRouter);
router.use("/profile", profileRouter);
// router.use("/likes", likeRouter);

module.exports = router;
