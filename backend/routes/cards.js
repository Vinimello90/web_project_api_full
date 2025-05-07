const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const validateURL = require('../utils/validators/validateURL');

router.get('/', getCards);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard,
);
router.delete('/:cardId', removeCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
