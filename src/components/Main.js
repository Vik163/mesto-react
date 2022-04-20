function Main() {
  function handleEditAvatarClick() {
    document
      .querySelector(".popup_type_profile-avatar")
      .classList.add("popup_opened");
  }
  function handleEditProfileClick() {
    document.querySelector(".popup_type_profile").classList.add("popup_opened");
  }
  function handleAddPlaceClick() {
    document.querySelector(".popup_type_cards").classList.add("popup_opened");
  }

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src="#" alt="аватар" />
            <button
              className="profile__avatar-button button-hover"
              onClick={handleEditAvatarClick}
              type="button"
              aria-label="edit"
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title"></h1>
            <button
              className="profile__edit-button button-hover"
              onClick={handleEditProfileClick}
              type="button"
              aria-label="edit"
            ></button>
            <p className="profile__subtitle"></p>
          </div>
        </div>
        <button
          className="profile__add-button button-hover"
          onClick={handleAddPlaceClick}
          type="button"
          aria-label="add"
        ></button>
      </section>

      <section className="cards content__cards">
        <ul className="cards__container"></ul>
      </section>
    </main>
  );
}

export default Main;
