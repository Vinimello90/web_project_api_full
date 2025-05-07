import { useContext } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import NoCards from "./components/NoCards/NoCards";

export default function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    onOpenPopup,
    onClosePopup,
    popup,
    onAddPlaceSubmit,
    onCardLike,
    onCardDelete,
    cards,
  } = props;

  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const newCardPopup = {
    title: "Novo local",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="avatar"
            className="profile__avatar"
          />
          <button
            type="button"
            aria-label="Edit avatar"
            className="button button_avatar"
            onClick={() => onOpenPopup(editAvatarPopup)}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__name-button-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="Edit profile"
              className="button button_edit"
              onClick={() => onOpenPopup(editProfilePopup)}
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          aria-label="Add card"
          className="button button_add"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="gallery">
        <ul className="gallery__cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}

          {cards.length === 0 && <NoCards />}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={onClosePopup}
          title={popup.title}
          popupType={popup.type}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
