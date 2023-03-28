const { Movies } = require("../models");
const { Op } = require("sequelize");

class AdminRepository {
  postMovie = async ({
    name,
    kind,
    desc,
    playtime,
    viewLimit,
    status,
    videothumbUrl,
    videoUrl,
  }) => {
    const createdMovie = await Movies.create({
      name,
      kind,
      desc,
      playtime,
      viewLimit,
      status,
      videothumbUrl,
      videoUrl,
    });
    return createdMovie;
  };

  findOneMovie = async ({ contentIdx }) => {
    const movie = await Movies.findOne({ where: { contentIdx } });
    return movie;
  };

  deleteMovie = async ({ contentIdx }) => {
    await Movies.destroy({ where: { contentIdx } });
    return;
  };
}

module.exports = AdminRepository;
