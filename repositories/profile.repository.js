const { Profile } = require("../models");

class ProfileRepository extends Profile {
  constructor() {
    super();
  }
  createProfile = async (profileName, userIdx) => {
    const createUser = await Profile.create({ profileName, userIdx });
    return createUser;
  };
}

module.exports = ProfileRepository;