const ProfileRepository = require("../repositories/profile.repository");
const logger = require("../middlewares/logger.js");
class ProfileService {
    constructor() {
      this.profileRepository = new ProfileRepository();
    }
    createProfile = async (profieName, userIdx) => {
        try {

          await this.profileRepository.createProfile(profieName, userIdx);
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
                profileName: profile.profieName,
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
}

module.exports = ProfileService;