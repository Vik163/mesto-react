import React from "react";
import { apiNew } from "./../utils/Api.js";
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([apiNew.getUserInfo(), apiNew.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={userAvatar} alt="аватар" />
            <button
              className="profile__avatar-button button-hover"
              onClick={props.onEditAvatar}
              type="button"
              aria-label="edit"
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__edit-button button-hover"
              onClick={props.onEditProfile}
              type="button"
              aria-label="edit"
            ></button>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button
          className="profile__add-button button-hover"
          onClick={props.onAddPlace}
          type="button"
          aria-label="add"
        ></button>
      </section>

      <section className="cards content__cards">
        <ul className="cards__container">
          {cards.map((card) => (
            <Card
              card={card}
              onImagePopup={props.onImagePopup}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
