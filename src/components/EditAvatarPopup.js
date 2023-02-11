import React, { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ onUpdateAvatar, isOpen, onClose }) => {
  const inputRef = useRef();
  const [error, setError] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({ avatar: inputRef.current.value });
  }

  function handleChange() {
    setError(inputRef.current.validationMessage);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={(evt) => handleSubmit(evt)}
    >
      <label className="edit-form__field">
        <input
          className={
            error
              ? "edit-form__item edit-form__item_type_error"
              : "edit-form__item"
          }
          ref={inputRef}
          onChange={handleChange}
          id="avatar-input"
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="edit-form__item-error avatar-input-error">
          {error}
        </span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
