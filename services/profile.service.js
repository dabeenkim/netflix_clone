const ProfileRepository = require("../repositories/profile.repository");
const logger = require("../middlewares/logger.js");
const jwt = require("jsonwebtoken");
class ProfileService {
    constructor() {
      this.profileRepository = new ProfileRepository();
    }
    createProfile = async (profileName, userIdx) => {
        try {

          await this.profileRepository.createProfile(profileName, userIdx);
        } catch (error) {
          logger.error(error.message);
          throw error;
        }
      };
      getAllProfile = async (userIdx) => {
        try {

          const allProfiles = await this.profileRepository.getAllProfile(userIdx);
          allProfiles.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });
          return allProfiles.map((profile) => {
            return {
                profileIdx: profile.profileIdx,
                userIdx: profile.userIdx,
                profileName: profile.profileName,
                profileImgUrl: profile.profileImgUrl,
                viewLimit: profile.viewLimit,
                status: profile.status,
                createdAt: profile.createdAt,
                updatedAt: profile.updatedAt,
            }
          })
        } catch (error) {
          logger.error(error.message);
          throw error;
        }
      };
      profileLogin = async (profileName) => {
        try {
          const user = await this.profileRepository.findByID(profileName);
    
          if (!user) {
            throw Boom.notFound("존재하지 않는 프로필 네임입니다");
          }
    
        } catch (error) {
          logger.error(error.message);
          throw error;
        }
      };
      generateToken = async (profileName) => {
        const token = jwt.sign({ profileName }, process.env.SECRET_KEY, {
          expiresIn: "60m",
        });
    
        return token;
      };
}

module.exports = ProfileService;