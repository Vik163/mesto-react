import React from "react";
// import ReactDOM from "react-dom/client";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

  function CreatePopupAvatar() {
    const Element = (
      <label className="popup__label popup__label_type_profile-avatar">
        <input
          className="popup__input popup__input_type_link"
          id="url-input-avatar"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          value=""
          required
        />
        <span className="popup__input-error url-input-avatar-error"></span>
      </label>
    );
    return PopupWithForm({
      name: "profile-avatar",
      title: "Обновить аватар",
      text: "Сохранить",
      isOpen: isEditAvatarPopupOpen,
      onClose: closeAllPopups,
      children: Element,
    });
  }

  function CreatePopupProfile() {
    const Element = (
      <>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_name"
            id="name-input"
            type="text"
            name="inputName"
            placeholder="Имя"
            value=""
            minlength="2"
            maxlength="40"
            required
          />
          <span className="popup__input-error name-input-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_about-me"
            id="about-me-input"
            type="text"
            placeholder="О себе"
            name="inputAboutMe"
            value=""
            minlength="2"
            maxlength="200"
            required
          />
          <span className="popup__input-error about-me-input-error"></span>
        </label>
      </>
    );
    return PopupWithForm({
      name: "profile",
      title: "Редактировать профиль",
      text: "Сохранить",
      isOpen: isAddPlacePopupOpen,
      onClose: closeAllPopups,
      children: Element,
    });
  }

  function CreatePopupCards() {
    const Element = (
      <>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_title"
            id="title-input"
            type="text"
            placeholder="Название"
            name="name"
            value=""
            minlength="2"
            maxlength="30"
            required
          />
          <span className="popup__input-error title-input-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_link"
            id="url-input"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            value=""
            required
          />
          <span className="popup__input-error url-input-error"></span>
        </label>
      </>
    );
    return PopupWithForm({
      name: "cards",
      title: "Новое место",
      text: "Сохранить",
      isOpen: isEditProfilePopupOpen,
      onClose: closeAllPopups,
      children: Element,
    });
  }
  function handleCardClick(e) {
    setSelectedCard(e.target);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard(false);
    }
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onImagePopup={handleCardClick}
        />
        <Footer />
        <section className="popups" tabindex="0">
          <CreatePopupAvatar />
          <CreatePopupProfile />
          <CreatePopupCards />
          <ImagePopup
            name={"image"}
            isOpen={selectedCard}
            onClose={closeAllPopups}
          />
        </section>
      </div>
    </>
  );
}

export default App;
