function Card(props) {
  function handleClick() {
    props.onImagePopup(props.card);
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
        className="card__basket button-hover"
        type="button"
        aria-label="basket"
      ></button>
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
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
}

export default Card;
