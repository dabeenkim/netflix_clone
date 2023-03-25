const express = require("express");
const router = express.Router();

const userRouter = require("./user.routes");
const videoRouter = require("./movie.route");

router.use("/user", userRouter);
router.use("/movies", videoRouter);

module.exports = router;
