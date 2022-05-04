import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__basket button-hover ${
    !isOwn && "card__basket_hidden"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__icon ${
    isLiked && "card__icon_active"
  }`;

  function handleClick() {
    props.onImagePopup(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="basket"
        onClick={handleDeleteClick}
      ></button>
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes-info">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
            aria-label="like"
          ></button>
          <p className="card__likes-num">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
