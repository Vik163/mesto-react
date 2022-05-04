import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const [valueAvatar, setValueAvatar] = React.useState("");
  const textInput = React.useRef(0);

  function handleChangeAvatar(e) {
    setValueAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(
      {
        avatar: textInput.current.value,
      },
      setValueAvatar
    );
  }

  return (
    <PopupWithForm
      name={"profile-avatar"}
      title={"Обновить аватар"}
      text={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label popup__label_type_profile-avatar">
        <input
          className="popup__input popup__input_type_link"
          id="url-input-avatar"
          type="url"
          onChange={handleChangeAvatar}
          value={valueAvatar}
          ref={textInput}
          placeholder="Ссылка на картинку"
          name="link"
          required
        />
        <span className="popup__input-error url-input-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
