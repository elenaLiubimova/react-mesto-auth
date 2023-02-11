import { useEffect } from "react";

const PopupWithForm = ({
  isOpen,
  name,
  title,
  children,
  buttonText,
  onClose,
  onSubmit,
}) => {
  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
  });

  return (
    <div
      className={
        isOpen
          ? `popup popup_opened popup_type_${name}`
          : `popup popup_type_${name}`
      }
      onClick={onClose}
    >
      <div
        className={`popup__container popup__container_type_${name}`}
        onClick={(evt) => evt.stopPropagation()}
      >
        <form className="edit-form" name={name} onSubmit={onSubmit} noValidate>
          <h2 className="edit-form__title">{title}</h2>
          {children}
          <button
            className="save-button"
            type="submit"
            aria-label="Кнопка сохранения данных"
          >
            {buttonText}
          </button>
        </form>
        <button
          className="close-button"
          type="button"
          aria-label="Кнопка закрытия попапа"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default PopupWithForm;
