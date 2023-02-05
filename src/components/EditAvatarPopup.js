import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ onUpdateAvatar, isOpen, onClose }) => {
  const inputRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({ avatar: inputRef.current.value });
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
          className="edit-form__item"
          ref={inputRef}
          id="avatar-input"
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="edit-form__item-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
