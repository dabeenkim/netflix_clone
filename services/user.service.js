require('dotenv').config();

const UserRepository = require('../repositories/user.repository');
const jwt = require('jsonwebtoken');
const { createHashPassword, comparePassword } = require('../modules/cryptoUtils.js');
const Boom = require('boom');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  userLogin = async (email, password) => {
      const user = await this.userRepository.findByID(email);
      
      if (!user) {
        throw Boom.notFound('존재하지 않는 회원입니다', false);
      }

      const comparePw = await comparePassword(password, user.password);

      if (!comparePw) {
        throw Boom.unauthorized('패스워드를 확인해주세요.', false, 401);
      }
  };

  generateToken = async (email) => {
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: '60m',
    });

    return token;
  };

  userSignup = async (email, nickname, password) => {

      const existingUser = await this.userRepository.findByID( email );

      if (existingUser) {
        throw Boom.badData('중복된 아이디 입니다', false);
      }

      const existingNickname = await this.userRepository.findBynickname( nickname );

      if (existingNickname) {
        throw Boom.badData('중복된 닉네임 입니다', false);
      }

      const hashedPassword = await createHashPassword(password);

      await this.userRepository.userSignup(
        email,
        nickname,
        hashedPassword,
      );
  };
  getAllusers = async () => {
    const allUsers = await this.userRepository.getAllusers();
    allUsers.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return allUsers.map((user) => {
      return {
        userId: user.userId,
        email: user.email,
        nickname: user.nickname,
        passwd: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  }
  
}
module.exports = UserService;