import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import { apiNew } from "./../utils/Api.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import { CurrentUserContext, Cards } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([apiNew.getUserInfo(), apiNew.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardDelete(card) {
    apiNew
      .deleteCard(card)
      .then((result) => {
        console.log(result);
        // result.remove();
        // result = null;
        setCards((state) =>
          state.filter((c) => c._id === card._id && result.remove())
        );
        // popupWithDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(obj) {
    apiNew
      .sendInfoProfile(obj)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    !isLiked
      ? apiNew
          .addLikes(card)
          .then((result) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? result : c))
            );
          })
          .catch((err) => {
            console.log(err);
          })
      : apiNew
          .deleteLike(card)
          .then((result) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? result : c))
            );
          })
          .catch((err) => {
            console.log(err);
          });
  }

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
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Cards.Provider value={cards}>
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onImagePopup={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
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
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
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
        </Cards.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
