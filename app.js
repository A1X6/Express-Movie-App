const express = require('express');
const bodyParser = require('body-parser');
const moviesRouter = require('./routes/movies');
const logger = require('./middleware/logger');

const app = express();

app.use(bodyParser.json());
app.use(logger);

app.use('/movies', moviesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
