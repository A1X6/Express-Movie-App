const { body } = require("express-validator");

const movieSchema = [
  body("id")
    .isString()
    .withMessage("ID must be a string")
    .notEmpty()
    .withMessage("ID is required"),
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required"),
  body("director").isString().withMessage("Director must be a string"),
  body("year").isNumeric().withMessage("Year is not valid"),
  body("genre").isArray().withMessage(""),
  body("description").isString().withMessage("Description must be a string"),
  body("cast").isArray().withMessage(""),
  body("rating").isNumeric().withMessage("Rating is not valid"),
  body("imageURL").isString().withMessage(""),
];

module.exports = { movieSchema };
