const express = require("express");
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const ProfileController = require("../controllers/profile.controller");
const profileController = new ProfileController();

router.post("/", authMiddleware, profileController.createProfile);
router.get("/", authMiddleware,profileController.getAllProfile);

module.exports = router;
