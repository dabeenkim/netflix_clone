const ProfileRepository = require("../repositories/profile.repository");

class ProfileService {
    constructor() {
      this.profileRepository = new ProfileRepository();
    }
}

module.exports = ProfileService;