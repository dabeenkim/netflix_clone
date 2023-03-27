const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");

const videoRouter = require("./movie.route");
const likeRouter = require("./like.route");
const profileRouter = require("./profile.route");

router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/", videoRouter);

// router.use("/likes", likeRouter);

module.exports = router;
