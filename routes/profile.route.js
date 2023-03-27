const express = require("express");
const router = express.Router();


const ProfileController = require("../controllers/profile.controller");
const profileController = new ProfileController();

router.post("/", profileController.createProfile);

module.exports = router;
