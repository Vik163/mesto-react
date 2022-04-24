function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.card.link && "popup_opened"
      }`}
      onClick={props.onClose}
    >
      <div className="popup__container-image">
        <button
          className="popup__close button-hover"
          type="button"
          aria-label="close"
        ></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__caption">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
