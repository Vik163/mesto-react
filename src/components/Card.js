function Card(props) {
  return props.cards.map((card) => {
    return (
      <li className="card">
        <img
          className="card__image"
          src={card.link}
          alt={card.name}
          onClick={props.onImagePopup}
        />
        <button
          className="card__basket button-hover"
          type="button"
          aria-label="basket"
        ></button>
        <div className="card__info">
          <h2 className="card__title">{card.name}</h2>
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
    );
  });
}

export default Card;
