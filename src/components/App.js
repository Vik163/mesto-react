import React from "react";
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
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
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
        <section className="popups" tabIndex="0">
          <PopupWithForm
            name={"profile-avatar"}
            title={"Обновить аватар"}
            text={"Сохранить"}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          >
            <label className="popup__label popup__label_type_profile-avatar">
              <input
                className="popup__input popup__input_type_link"
                id="url-input-avatar"
                type="url"
                placeholder="Ссылка на картинку"
                name="link"
                required
              />
              <span className="popup__input-error url-input-avatar-error"></span>
            </label>
          </PopupWithForm>
          <PopupWithForm
            name={"profile"}
            title={"Редактировать профиль"}
            text={"Сохранить"}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          >
            <label className="popup__label">
              <input
                className="popup__input popup__input_type_name"
                id="name-input"
                type="text"
                name="inputName"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
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
                minLength="2"
                maxLength="200"
                required
              />
              <span className="popup__input-error about-me-input-error"></span>
            </label>
          </PopupWithForm>
          <PopupWithForm
            name={"cards"}
            title={"Новое место"}
            text={"Сохранить"}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          >
            <label className="popup__label">
              <input
                className="popup__input popup__input_type_title"
                id="title-input"
                type="text"
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
                placeholder="Ссылка на картинку"
                name="link"
                required
              />
              <span className="popup__input-error url-input-error"></span>
            </label>
          </PopupWithForm>
          <ImagePopup
            name={"image"}
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </section>
      </div>
    </>
  );
}

export default App;
