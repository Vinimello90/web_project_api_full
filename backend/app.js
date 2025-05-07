require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { API_PORT, DATABASE_URL } = process.env;

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log('MongoDB connection established'))
  .catch(() => console.error('Failed to connect to MongoDB'));

const app = express();

const { PORT = API_PORT } = process.env;

app.use(express.json());

app.use(requestLogger);

app.use(cors());
app.options('*', cors());

app.use(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.use(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'The request was not found' });
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;
