export default function ImagePopup(props) {
  const { name, link } = props;
  return (
    <>
      <img src={link} className="popup__img" alt={name} />
      <p className="popup__title popup__title_image">{name}</p>
    </>
  );
}
