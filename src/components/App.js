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
      evt.key === "Escape" ||
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
          // card={cardItem}
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

          {/* <div className="popup popup_type_profile-avatar">
            <div className="popup__container popup__container_type_profile-avatar">
              <button
                className="popup__close button-hover"
                type="button"
                aria-label="close"
              ></button>
              <h2 className="popup__title">Обновить аватар</h2>
              <form
                action="#"
                name="editForm"
                className="popup__form popup__form_type_profile-avatar"
                novalidate
              > */}

          {/* <button className="popup__submit button-hover" type="submit">
                  Сохранить
                </button>
              </form>
            </div>
          </div> */}
          {/* <section className="popups" tabindex="0">
          <div className="popup popup_type_profile-avatar">
            <div className="popup__container popup__container_type_profile-avatar">
              <button
                className="popup__close button-hover"
                type="button"
                aria-label="close"
              ></button>
              <h2 className="popup__title">Обновить аватар</h2>
              <form
                action="#"
                name="editForm"
                className="popup__form popup__form_type_profile-avatar"
                novalidate
              >
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
                <button className="popup__submit button-hover" type="submit">
                  Сохранить
                </button>
              </form>
            </div>
          </div> */}
          {/* <div className="popup popup_type_delete-card">
            <div className="popup__container popup__container_type_delete-card">
              <button
                className="popup__close button-hover"
                type="button"
                aria-label="close"
              ></button>
              <h2 className="popup__title popup__title_type_delete-card">
                Вы уверены?
              </h2>
              <form
                action="#"
                name="editForm"
                className="popup__form popup__form_type_delete-card"
                novalidate
              >
                <button className="popup__submit button-hover" type="submit">
                  Да
                </button>
              </form>
            </div>
          </div> */}
          {/* <div className="popup popup_type_profile">
          <div className="popup__container">
            <button
              className="popup__close button-hover"
              type="button"
              aria-label="close"
            ></button>
            <h2 className="popup__title">Редактировать профиль</h2>
            <form
              action="#"
              name="editForm"
              className="popup__form popup__form_type_profile"
              novalidate
            >
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
              <button className="popup__submit button-hover" type="submit">
                Сохранить
              </button>
            </form>
          </div>
        </div> */}
          {/* <div className="popup popup_type_cards">
          <div className="popup__container">
            <button
              className="popup__close button-hover"
              type="button"
              aria-label="close"
            ></button>
            <h2 className="popup__title">Новое место</h2>
            <form
              action="#"
              name="editForm"
              className="popup__form popup__form_type_cards"
              novalidate
            >
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
              <button className="popup__submit button-hover" type="submit">
                Сохранить
              </button>
            </form>
          </div>
        </div> */}
          {/* <div className="popup popup_type_image">
            <div className="popup__container-image">
              <button
                className="popup__close button-hover"
                type="button"
                aria-label="close"
              ></button>
              <img className="popup__image" src="#" alt="" />
              <p className="popup__caption"></p>
            </div>
          </div> */}
        </section>
      </div>

      {/* <template className="card-template">
        <li className="card">
          <img className="card__image" src="#" alt="" />
          <button
            className="card__basket button-hover"
            type="button"
            aria-label="basket"
          ></button>
          <div className="card__info">
            <h2 className="card__title"></h2>
            <div className="card__likes-info">
              <button
                className="card__icon"
                type="button"
                aria-label="like"
              ></button>
              <p className="card__likes-num">0</p>
            </div>
          </div>
        </li>
      </template> */}
    </>
  );
}

export default App;
