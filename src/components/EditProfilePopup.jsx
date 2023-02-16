import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ onUpdateUser, isOpen, onClose, isLoading }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameInput(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionInput(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="edit-form__field">
        <input
          className="edit-form__item"
          id="name-input"
          value={name || ""}
          onChange={handleNameInput}
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="edit-form__item-error name-input-error"></span>
      </label>
      <label className="edit-form__field">
        <input
          className="edit-form__item"
          id="job-input"
          type="text"
          name="job"
          value={description || ""}
          onChange={handleDescriptionInput}
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="edit-form__item-error job-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
