const Card = require('../models/card');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.send(cards.reverse());
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const { _id: userId } = req.user;
    const newCard = await Card.create({ name, link, owner: userId });
    res.status(201).send(newCard);
  } catch (err) {
    next(err);
  }
};

module.exports.removeCard = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { cardId } = req.params;
    const card = await Card.findById(cardId).orFail(() => {
      throw new NotFoundError('No card found with the provided ID.');
    });
    if (card.owner.toString() !== userId) {
      throw new ForbiddenError('User not authorized to delete this card.');
    }
    await card.deleteOne();
    res.status(200).send({ message: 'Card has been removed' });
  } catch (err) {
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail(() => {
      throw new NotFoundError('No card found with the provided ID.');
    });
    res.status(200).send(updatedCard);
  } catch (err) {
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).orFail(() => {
      throw new NotFoundError('No card found with the provided ID.');
    });
    res.status(200).send(updatedCard);
  } catch (err) {
    next(err);
  }
};
