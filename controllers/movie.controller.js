const MovieService = require('../services/movie.service');
const Boom = require('boom');
const Joi = require("joi");

class MovieService {
    constructor () {
        this.movieService = new MovieService();
    }

    postMovie = async(req,res) => {
        try {
            const {title, category, desc, playtime, actor, genre, thumbUrl, streamUrl} = req.body;
            
            const messages = {
                "string.base": "이 필드는 문자열로 이루어져야 합니다.",
                "string.empty": "이 필드는 비어 있을 수 없습니다.",
                "string.min": "이 필드는 최소 {{#limit}} 문자 이상이어야 합니다.",
                "string.max": "이 필드는 최대 {{#limit}} 문자 이하여야 합니다.",
                "any.required": "이 필드는 필수입니다.",
            };

            const schema = Joi.object({
                title: Joi.string().min(1).max(30).messages(),
                category: ,
                desc: ,
                thumbUrl: ,
                streamUrl: ,
            });
        } catch (error) {
            if (Boom.isBoom(error)) {
                res.status(error.statusCode).json({ errorMessage: error.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
              } else {
                res.status(400).json({ errorMessage: "영상 등록에 실패하였습니다." });
              }
        }
    }

    updateMovie
    deleteMovie
}