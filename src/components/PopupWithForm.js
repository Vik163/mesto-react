function PopupWithForm(props) {
  return (
    // <section className="popups" tabindex="0">
    <div className={`popup popup_type_${props.name}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button
          className="popup__close button-hover"
          type="button"
          aria-label="close"
        ></button>
        <h2 className={`popup__title popup__title_type_${props.name}`}>
          {props.title}
        </h2>
        <form
          action="#"
          name={props.name}
          className={`popup__form popup__form_type_${props.name}`}
          novalidate
        >
          {props.children}
          <button className="popup__submit button-hover" type="submit">
            Да
          </button>
        </form>
      </div>
    </div>
    // </section>
  );
}

export default PopupWithForm;
