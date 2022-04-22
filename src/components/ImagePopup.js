function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
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
          src={props.isOpen.src}
          alt={props.isOpen.alt}
        />
        <p className="popup__caption">{props.isOpen.alt}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
