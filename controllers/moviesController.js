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
  movies.push(newMovie);
  writeDatabase(movies);
  res.status(201).json(newMovie);
};

exports.deleteMovie = (req, res) => {
  const id = req.params.id;
  const movies = readDatabase();
  newmovies = movies.filter((movie) => movie.id != parseInt(id));
  const movieExists = movies.some(
    (movie) => parseInt(movie.id) === parseInt(id)
  );
  console.log(movieExists);
  console.log(typeof id);
  if (!movieExists) {
    return res
      .status(404)
      .json({ error: `Movie with Id: ${id} doesn't exist` });
  }
  fs.writeFile(databasePath, JSON.stringify(newmovies), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).json(readDatabase());
  });
};
