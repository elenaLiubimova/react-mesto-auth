import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameInput(evt) {
    setName(evt.target.value);
  }

  function handleLinkInput(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace(name, link);
  }

  return (
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <label className="edit-form__field">
        <input
          className="edit-form__item"
          onChange={handleNameInput}
          value={name}
          id="place-input"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="edit-form__item-error place-input-error"></span>
      </label>
      <label className="edit-form__field">
        <input
          className="edit-form__item"
          onChange={handleLinkInput}
          value={link}
          id="photo-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="edit-form__item-error photo-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
