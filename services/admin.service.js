const AdminRepository = require("../repositories/admin.repository");
const Boom = require("boom");

class AdminService {
  constructor() {
    this.adminRepository = new AdminRepository();
  }

  postMovie = async ({
    name,
    kind,
    desc,
    viewLimit,
    playtime,
    status,
    videothumbUrl,
    videoUrl,
  }) => {
    try {
      if (
        !name ||
        !kind ||
        !desc ||
        !viewLimit ||
        !playtime ||
        !status ||
        !videothumbUrl ||
        !videoUrl
      ) {
        throw Boom.preconditionFailed("데이터 형식이 올바르지 않습니다.");
      }
      await this.adminRepository.postMovie({
        name,
        kind,
        desc,
        viewLimit,
        playtime,
        status,
        videothumbUrl,
        videoUrl,
      });
    } catch (error) {
      throw Boom.preconditionFailed("영상 등록에 실패하였습니다.");
    }
  };

  updateMovie = async ({
    contentIdx,
    name,
    kind,
    desc,
    viewLimit,
    playtime,
    status,
    videothumbUrl,
    videoUrl,
  }) => {
    try {
      const movie = await this.adminRepository.findOneMovie({ contentIdx });
      if (!movie) {
        return res
          .status(404)
          .json({ errorMessage: "해당 ID의 영상이 존재하지 않습니다." });
      }

      let updatedMovie;
      if (name) {
        updatedMovie = await movie.update({ name });
      }
      if (kind) {
        updatedMovie = await movie.update({ kind });
      }
      if (desc) {
        updatedMovie = await movie.update({ desc });
      }
      if (playtime) {
        updatedMovie = await movie.update({ playtime });
      }
      if (viewLimit) {
        updatedMovie = await movie.update({ viewLimit });
      }
      if (status) {
        updatedMovie = await movie.update({ status });
      }
      if (videothumbUrl) {
        updatedMovie = await movie.update({ videothumbUrl });
      }
      if (videoUrl) {
        updatedMovie = await movie.update({ videoUrl });
      }

      return updatedMovie;
    } catch (error) {
      throw Boom.preconditionFailed("영상 정보 수정에 실패하였습니다.");
    }
  };

  deleteMovie = async ({ contentIdx }) => {
    try {
      const movie = await this.adminRepository.findOneMovie({ contentIdx });
      if (!movie) {
        return res
          .status(404)
          .json({ errorMessage: "해당 ID의 영상이 존재하지 않습니다." });
      }

      await this.adminRepository.deleteMovie({ contentIdx });
    } catch (error) {
      throw Boom.preconditionFailed("영상 삭제에 실패하였습니다.");
    }
  };
}

module.exports = AdminService;
