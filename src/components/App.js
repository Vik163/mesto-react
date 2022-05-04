import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import { apiNew } from "./../utils/Api.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import { CurrentUserContext, Cards } from "../contexts/CurrentUserContext";

//Накосячил, конечно. Но, что еще поправить не знаю.

function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAddConfirmPopupOpen, setIsAddConfirmPopupOpen] =
    React.useState(false);
  const [valueSubmit, setValueSubmit] = React.useState("Сохранить");
  const [valueSubmitDeleteCard, setValueSubmitDeleteCard] =
    React.useState("Да");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardDelete, setCardDelete] = React.useState({});
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

  function handleAddPlaceSubmit(obj, setValueImage, setValuePlace) {
    setValueSubmit("Сохранение...");
    apiNew
      .addCard(obj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setValueImage("");
        setValuePlace("");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValueSubmit("Сохранить");
      });
  }

  function handleCardDelete(e) {
    e.preventDefault();

    setValueSubmitDeleteCard("Сохранение...");
    apiNew
      .deleteCard(cardDelete)
      .then(() => {
        setCards((state) => state.filter((c) => !(c._id === cardDelete._id)));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValueSubmit("Да");
      });
  }

  function onConfirmDelete(card) {
    setIsAddConfirmPopupOpen(true);
    setCardDelete(card);
  }

  function handleUpdateUser(obj) {
    setValueSubmit("Сохранение...");

    apiNew
      .sendInfoProfile(obj)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValueSubmit("Сохранить");
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

  function handleUpdateAvatar(avatar, setValueAvatar) {
    setValueSubmit("Сохранение...");
    apiNew
      .addAvatar(avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
        setValueAvatar("");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValueSubmit("Сохранить");
      });
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
    setIsAddConfirmPopupOpen(false);
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
            onCardDelete={onConfirmDelete}
          />
          <Footer />
          <section className="popups" tabIndex="0">
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              text={valueSubmit}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              text={valueSubmit}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              text={valueSubmit}
            />
            <PopupWithForm
              name={"delete-card"}
              title={"Вы уверены?"}
              text={valueSubmitDeleteCard}
              isOpen={isAddConfirmPopupOpen}
              onClose={closeAllPopups}
              onSubmit={handleCardDelete}
            ></PopupWithForm>
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
