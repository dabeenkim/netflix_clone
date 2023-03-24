const express = require('express');
const router = express.Router();

const MovieController = require('../controllers/movie.controller');
const movieController = new MovieController();

router.post('/:categoryId', movieController.postMovie);
router.put('/:categoryId/:movieId', movieController.updateMovie);
router.delete('/:categoryId/:movieId', movieController.deleteMovie);

module.exports = router;