const ProfileService = require("../services/profile.service");

class ProfileController {
  constructor() {
    this.profileService = new ProfileService();
  }
  createProfile = async (req, res, next) => {
    try {
      const { profieName } = req.body;
      const { userIdx } = res.locals.user
      await this.profileService.createProfile(profieName, userIdx);

      return res.status(201).json({ message: "프로필 생성에 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };
  getAllProfile = async (req, res, next) => {
    try {

      const { userIdx } = res.locals.user
      const profile = await this.profileService.getAllProfile(userIdx);

      return res.status(200).json({ allProfiles: profile });
    } catch (error) {
      next(error);
    }
  };

}

module.exports = ProfileController;