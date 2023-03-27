const AdminService = require("../services/admin.service");
const Boom = require("boom");
const Joi = require("joi");

const messages = {
  "string.base": "이 필드는 문자열로 이루어져야 합니다.",
  "string.empty": "이 필드는 비어 있을 수 없습니다.",
  "string.min": "이 필드는 최소 {{#limit}} 문자 이상이어야 합니다.",
  "string.max": "이 필드는 최대 {{#limit}} 문자 이하여야 합니다.",
  "any.required": "이 필드는 필수입니다.",
};

class AdminController {
  constructor() {
    this.adminService = new AdminService();
  }

  postMovie = async (req, res) => {
    try {
      const {
        name,
        desc,
        kind,
        viewLimit,
        playtime,
        videothumbUrl,
        videoUrl,
        status
      } = req.body;

      const schema = Joi.object({
        name: Joi.string()
          .min(1)
          .max(30)
          .messages({
            ...messages,
            "string.min": "이 필드는 최소 {{#limit}} 문자 이상이어야 합니다.",
            "string.max": "이 필드는 최대 {{#limit}} 문자 이하여야 합니다.",
          }),
        kind: Joi.string()
          .min(1)
          .max(30)
          .message({
            ...messages,
            "string.min": "이 필드는 최소 {{#limit}} 문자 이상이어야 합니다.",
            "string.max": "이 필드는 최대 {{#limit}} 문자 이하여야 합니다.",
          }),
        desc: Joi.string()
          .min(1)
          .max(300)
          .message({
            ...messages,
            "string.min": "이 필드는 최소 {{#limit}} 문자 이상이어야 합니다.",
            "string.max": "이 필드는 최대 {{#limit}} 문자 이하여야 합니다.",
          }),
        playtime: Joi.any().message({
          ...messages,
          "any.required": "이 필드는 필수입니다.",
        }),
        viewLimit: Joi.string().message({
          ...messages,
          "any.required": "이 필드는 필수입니다.",
        }),
        status: Joi.string().message({
          ...messages,
          "any.required": "이 필드는 필수입니다.",
        }),
        videothumbUrl: Joi.string().message({
          ...messages,
          "any.required": "이 필드는 필수입니다.",
        }),
        videoUrl: Joi.string().message({
          ...messages,
          "any.required": "이 필드는 필수입니다.",
        }),
      });

      const validate = schema.validate(
        { name, kind, desc, playtime, viewLimit, status, videothumbUrl, videoUrl },
        { abortEarly: false }
      );

      if (validate.error) {
        throw Boom.badRequest(validate.error.message);
      } else {
        console.log("Validate input");
      }

      const postedMovie = await this.adminService.postMovie({
        name,
        kind,
        desc,
        playtime,
        viewLimit,
        status,
        videothumbUrl,
        videoUrl,
      });
      return res.status(201).json({postedMovie, message: "영상 등록을 완료했습니다." });
    } catch (error) {
      if (Boom.isBoom(error)) {
        res.status(error.statusCode).json({ errorMessage: error.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        res.status(400).json({ errorMessage: "영상 등록에 실패하였습니다." });
      }
    }
  };

  updateMovie = async (req, res) => {
    try {
      const { contentIdx } = req.params;
      const {
        name,
        kind,
        desc,
        playtime,
        viewLimit,
        status,
        videothumbUrl,
        videoUrl,
      } = req.body;

      const updatedElement = {
        name: null,
        kind: null,
        desc: null,
        playtime: null,
        viewLimit: null,
        status: null,
        videothumbUrl: null,
        videoUrl: null,
      };
      if (contentIdx) {
        updatedElement.contentIdx = contentIdx;
      }
      if (name) {
        updatedElement.name = name;
      }
      if (kind) {
        updatedElement.kind = kind;
      }
      if (desc) {
        updatedElement.desc = desc;
      }
      if (playtime) {
        updatedElement.playtime = playtime;
      }
      if (viewLimit) {
        updatedElement.viewLimit = viewLimit;
      }
      if (status) {
        updatedElement.status = status;
      }
      if (videothumbUrl) {
        updatedElement.videothumbUrl = videothumbUrl;
      }
      if (videoUrl) {
        updatedElement.videoUrl = videoUrl;
      }

      const updatedMovie = await this.adminService.updateMovie(updatedElement);
      return res
        .status(201)
        .json({ updatedMovie, message: "정보 수정을 완료했습니다." });
    } catch (error) {
      if (Boom.isBoom(error)) {
        res.status(error.statusCode).json({ errorMessage: error.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        res.status(400).json({ errorMessage: "정보 수정에 실패하였습니다." });
      }
    }
  };

  deleteMovie = async (req, res) => {
    try {
      const { contentIdx } = req.params;

      const movie = await this.adminService.findOneMovie({ contentIdx });
      if (!movie) {
        return res
          .status(404)
          .json({ errorMessage: "해당 ID의 영상이 존재하지 않습니다." });
      }

      await this.adminService.deleteMovie({ contentIdx });
      return res.status(201).json({ message: "영상을 삭제했습니다." });
    } catch (error) {
      if (Boom.isBoom(error)) {
        res.status(error.statusCode).json({ errorMessage: error.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
      } else {
        res.status(400).json({ errorMessage: "영상 삭제에 실패하였습니다." });
      }
    }
  };
}

module.exports = AdminController;
