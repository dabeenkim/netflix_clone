const ProfileService = require("../services/profile.service");

class ProfileController {
  constructor() {
    this.profileService = new ProfileService();
  }
  createProfile = async (req, res, next) => {
    try {
      const { profileName } = req.body;
      const { userIdx } = res.locals.user
      await this.profileService.createProfile(profileName, userIdx);

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

  profileLogin = async (req, res, next) => {
    try {
      res.clearHeaders;

      const { profileName } = req.params;
      await this.profileService.profileLogin(profileName);

      const token = await this.profileService.generateToken(profileName);
      res.set("Authorization", `Bearer ${token}`);

      return res.status(201).json({ message: "로그인에 성공했습니다" });
    } catch (error) {
      next(error);
    }
  };

}

module.exports = ProfileController;