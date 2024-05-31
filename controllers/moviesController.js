const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, '../movies.json');

const readDatabase = () => {
    try {
        const data = fs.readFileSync(databasePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading database:', err);
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

exports.updateMovie = (req, res) => {
    const movieId = Number(req.params.id);
    const updatedMovie = req.body;
    const movies = readDatabase();
    // console.log(movies)

    let index = -1;
    movies.filter((movie, i) => {
        movie.id === movieId ? index = i : ''
    })
    // console.log(index)
    if (index === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    movies[index] = { ...movies[index], ...updatedMovie };
    writeDatabase(movies);

    res.status(200).json(movies[index]);
}





