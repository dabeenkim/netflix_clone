const { Profile } = require("../models");

class ProfileRepository extends Profile {
  constructor() {
    super();
  }
  createProfile = async (profileName, userIdx) => {
    const createProfile = await Profile.create({ profileName, userIdx });
    return createProfile;
  };
  getAllProfile = async (userIdx) => {
    const profile = await Profile.findAll({
      attributes: [
        'profileIdx',
        'userIdx',
        'profileName',
        'profileImgUrl',
        'viewLimit',
        'status',
        'createdAt',
        'updatedAt',
      ],
      where: {userIdx},

      order: [['createdAt', 'DESC']], // 생성일 기준으로 내림차순 정렬
      raw: true, // raw: true를 하면 데이터를 JSON 형태로 반환해준다.
    });

    return profile; // 변환된 데이터 배열 반환
  };
  findByID = async (profileName) => {
    const findProfileName = await Profile.findOne({
      where: { profileName },
    });
    return findProfileName;
  };
}

module.exports = ProfileRepository;