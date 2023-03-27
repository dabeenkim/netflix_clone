const express = require("express");
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const authMiddlewareProfile = require('../middlewares/authMiddlewareProfile');
const ProfileController = require("../controllers/profile.controller");
const profileController = new ProfileController();

router.post("/", authMiddleware, profileController.createProfile);
router.get("/", authMiddleware,profileController.getAllProfile);
router.get("/:profileName/login", authMiddleware,profileController.profileLogin);

module.exports = router;
