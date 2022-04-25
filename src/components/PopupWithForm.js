function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button
          className="popup__close button-hover"
          type="button"
          aria-label="close"
          onClick={props.onClose}
        ></button>
        <h2 className={`popup__title popup__title_type_${props.name}`}>
          {props.title}
        </h2>
        <form
          action="#"
          name={props.name}
          className={`popup__form popup__form_type_${props.name}`}
          noValidate
        >
          {props.children}
          <button className="popup__submit button-hover" type="submit">
            {props.text}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
