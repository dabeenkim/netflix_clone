const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");

const videoRouter = require("./movie.route");
const likeRouter = require("./like.route");
const profileRouter = require("./profile.route");
const saveRouter = require("./save.route");
const searchRouter = require("./search.routes");

router.use("/user", userRouter);
router.use("/movies", videoRouter, likeRouter, saveRouter);
router.use("/profile", profileRouter);
router.use("/search", searchRouter);

module.exports = router;
