const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateURL = require('../utils/validators/validateURL');

const {
  getUsers,
  getUserById,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUserById);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2),
      about: Joi.string().required().min(2),
    }),
  }),
  updateUser,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar,
);

module.exports = router;
