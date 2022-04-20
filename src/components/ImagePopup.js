function ImagePopup() {
  return (
    <div className="popup popup_type_image">
      <div className="popup__container-image">
        <button
          className="popup__close button-hover"
          type="button"
          aria-label="close"
        ></button>
        <img className="popup__image" src="#" alt="" />
        <p className="popup__caption"></p>
      </div>
    </div>
  );
}

export default ImagePopup;
