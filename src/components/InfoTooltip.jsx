import React, { useEffect } from "react";

const InfoTooltip = ({ infoTooltipIcon, infoTooltipDescription, isOpen, onClose }) => {
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
          ? `info-tooltip info-tooltip_opened info-tooltip_success`
          : `info-tooltip info-tooltip_success`
      }
      onClick={onClose}
    >
      <div className="info-tooltip__container" onClick={(evt) => evt.stopPropagation()}>
        <img
          className="info-tooltip__icon"
          src={infoTooltipIcon}
          alt="Иконка тултипа результата регистрации"
        />
        <p className="info-tooltip__description">{infoTooltipDescription}</p>
        <button
          className="close-button"
          type="button"
          aria-label="Кнопка закрытия тултипа"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
