const readDatabase = require("../controllers/moviesController")

exports.getMovieById = (id) => {
    const movies = readDatabase()
    const movie = movies.filter(el => el.id == id)
    return movie
}