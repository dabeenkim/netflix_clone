const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");
const profileRouter = require("./profile.route");
const videoRouter = require("./movie.route");
const likeRouter = require("./like.route");
const saveRouter = require("./save.route");

router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/movies", videoRouter, likeRouter, saveRouter);


module.exports = router;
