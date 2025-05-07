const BAD_REQUEST = 400;
const CONFLICT_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;
const DUPLICATED_KEY = 11000;

module.exports = (err, req, res, next) => {
  const { name, statusCode = 500, message } = err;

  if (name === 'ValidationError') {
    const errorMessage = Object.values(err.errors).map((e) => e.message);
    res.status(BAD_REQUEST).send({ message: `${errorMessage}` });
    return;
  }
  if (name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: 'The provided ID is invalid.' });
    return;
  }

  if (err.code === DUPLICATED_KEY) {
    res.status(CONFLICT_ERROR).send({ message: 'The provided key already exists.' });
    return;
  }

  res.status(statusCode).send({
    message: statusCode !== INTERNAL_SERVER_ERROR ? message : 'Internal Server Error.',
  });
};
