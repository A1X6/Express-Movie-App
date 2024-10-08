const fs = require("fs");
const path = require("path");

const databasePath = path.join(__dirname, "../movies.json");

const readDatabase = () => {
  try {
    const data = fs.readFileSync(databasePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database:", err);
    return [];
  }
};

const writeDatabase = (data) => {
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
};

exports.getAllMovies = (req, res) => {
  const movies = readDatabase();
  res.json(movies);
};

exports.addMovie = (req, res) => {
  const movies = readDatabase();
  const newMovie = req.body;
  const movieExists = movies.some(movie => movie.id === newMovie.id);
  if (movieExists) {
        return res.status(404).json({ error: `Movie with Id: ${newMovie.id} already exists` });
    }
  movies.push(newMovie);
  writeDatabase(movies);
  res.status(201).json(newMovie);
};

exports.updateMovie = (req, res) => {
  const id = Number(req.params.id);

  const { title, director, year, genre, description, cast, rating, imageURL } =
    req.body;
  // console.log(updatedMovie)

  const movies = readDatabase();
  // console.log(movies)

  let index = -1;
  movies.filter((movie, i) => {
    movie.id === id ? (index = i) : "";
  });
  // console.log(index)
  if (index === -1) {
    return res.status(404).json({ error: `No movie with Id: ${id}` });
  }

  movies[index] = {
    id,
    title,
    director,
    year,
    genre,
    description,
    cast,
    rating,
    imageURL,
  };

  writeDatabase(movies);

  res.status(200).json(movies[index]);
};

exports.deleteMovie = (req, res) => {
  const id = req.params.id;
  const movies = readDatabase();
  const newMovies = movies.filter((movie) => movie.id != parseInt(id));
  const movieExists = movies.some(
    (movie) => parseInt(movie.id) === parseInt(id)
  );
  if (!movieExists) {
    return res
      .status(404)
      .json({ error: `Movie with Id: ${id} doesn't exist` });
  }
  fs.writeFile(databasePath, JSON.stringify(newMovies), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).json(readDatabase());
  });
};
