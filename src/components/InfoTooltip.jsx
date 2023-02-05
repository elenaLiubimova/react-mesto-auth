import React from "react";

const InfoTooltip = ({ infoTooltipIcon, infoTooltipDescription }) => {
  return (
    <div
      className={
        "info-tooltip info-tooltip_opened info-tooltip_type_success"
        // isOpen
        //   ? `info-tooltip info-tooltip_opened info-tooltip_success`
        //   : `info-tooltip info-tooltip_success`
      }
    >
      <div className="info-tooltip__container">
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
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
