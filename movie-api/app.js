const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { port } = require('./config');
const deserializeUser = require('./middlewares/deserializeUser');
const userRouter = require('./routes/user.route');
const movieRouter = require('./routes/movie.route');
const genreRouter = require('./routes/genres.route');
require('express-async-error');
require('./db');


const app = express();

app.use(cors());
app.use(express.json());
app.use(deserializeUser);

app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/genres', genreRouter);

app.use((err, req, res, next) => {
  console.error(err);
  err.statusCode = err.statusCode || 500;
  const handledError = err.statusCode < 500;
  res.status(err.statusCode)
    .send({
      data: {
        success: false,
        code: err.statusCode,
        message: handledError ? err.message : 'Internal server error',
        errors: err.errors || {}
      }
    });
});

app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
})
