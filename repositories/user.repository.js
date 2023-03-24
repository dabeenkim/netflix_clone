const { Users } = require('../models');

class UserRepository extends Users {
  constructor() {
    super();
  }

  findByID = async (email) => {
    const findEmail = await Users.findOne({
      where: { email },
    });
    return findEmail;
  }

  findBynickname = async (nickname) => {
    const findNick = await Users.findOne({
      where: { nickname },
    });
    return findNick;
  };

  userSignup = async (email, nickname, password) => {
    const createUser = await Users.create({ email, nickname, password });
    return createUser;
  };

  getAllusers = async () => {
    const user = await Users.findAll({
      attributes: [
        'userId',
        'email',
        'nickname',
        'password',
        'createdAt',
        'updatedAt',
      ],
    });
    return user;
  }
}

module.exports = UserRepository;
