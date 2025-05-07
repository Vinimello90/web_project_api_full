import { useContext, useEffect, useState } from "react";
import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import RemoveCard from "../Popup/components/RemoveCard/RemoveCard";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { name, link, likes, _id: id, owner: ownerId } = props.card;
  const { onOpenPopup, onCardLike, onCardDelete } = props;
  const { currentUser } = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(false);

  const imagePopup = {
    type: "image",
    children: <ImagePopup name={name} link={link} />,
  };

  useEffect(() => {
    const includesCurrentUser = likes.includes(currentUser._id);
    setIsLiked(includesCurrentUser);
  }, [likes, currentUser._id]);

  function handleLikeClick() {
    onCardLike(isLiked, props.card);
  }

  const removeCard = {
    title: "Tem certeza?",
    children: <RemoveCard cardId={id} onCardDelete={onCardDelete} />,
  };

  return (
    <li className="card">
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={() => onOpenPopup(imagePopup)}
      />
      {currentUser._id === ownerId && (
        <button
          type="button"
          aria-label="Delete card"
          className="button button_remove"
          onClick={() => onOpenPopup(removeCard)}
        ></button>
      )}
      <div className="card__title-container">
        <h2 className="card__title">{name}</h2>
        <button
          type="button"
          aria-label="Like card"
          className={`button button_like ${
            isLiked ? "button_like_activate" : ""
          }`}
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
