import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ onUpdateUser, isOpen, onClose }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameInputError, setNameInputError] = useState("");
  const [descriptionInputError, setDescriptionInputError] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameInput(evt) {
    setName(evt.target.value);
    setNameInputError(evt.target.validationMessage);
  }

  function handleDescriptionInput(evt) {
    setDescription(evt.target.value);
    setDescriptionInputError(evt.target.validationMessage);
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
      buttonText="Сохранить"
      onSubmit={(evt) => handleSubmit(evt)}
    >
      <label className="edit-form__field">
        <input
          className={
            nameInputError
              ? "edit-form__item edit-form__item_type_error"
              : "edit-form__item"
          }
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
        <span className="edit-form__item-error name-input-error">{nameInputError}</span>
      </label>
      <label className="edit-form__field">
        <input
          className={
            descriptionInputError
              ? "edit-form__item edit-form__item_type_error"
              : "edit-form__item"
          }
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
        <span className="edit-form__item-error job-input-error">{descriptionInputError}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
