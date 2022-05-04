import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [valuePlace, setValuePlace] = React.useState("");
  const [valueImage, setValueImage] = React.useState("");
  const textInputPlace = React.useRef({});
  const textInputImage = React.useRef({});

  function handleChangePlace(e) {
    setValuePlace(e.target.value);
  }

  function handleChangeImage(e) {
    setValueImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(
      {
        name: textInputPlace.current.value,
        link: textInputImage.current.value,
      },
      setValueImage,
      setValuePlace
    );
  }

  return (
    <PopupWithForm
      name={"cards"}
      title={"Новое место"}
      text={props.text}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_title"
          id="title-input"
          type="text"
          onChange={handleChangePlace}
          value={valuePlace}
          ref={textInputPlace}
          placeholder="Название"
          name="name"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_link"
          id="url-input"
          type="url"
          onChange={handleChangeImage}
          value={valueImage}
          ref={textInputImage}
          placeholder="Ссылка на картинку"
          name="link"
          required
        />
        <span className="popup__input-error url-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
