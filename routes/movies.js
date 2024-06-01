const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");
const { validate } = require("../validations/movie.validation");
const { movieSchema, movieIdSchema } = require("../validations/movie.validationScheme");

router.get("/", moviesController.getAllMovies);
router.post("/", validate(movieIdSchema), validate(movieSchema), moviesController.addMovie);
router.put("/:id", validate(movieSchema), moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
