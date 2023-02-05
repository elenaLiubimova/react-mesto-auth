import React from "react";

const RegAuthForm = ({ title, buttonText }) => {
  return (
    <section className="reg-auth">
      <form className="reg-auth-form" noValidate>
        <h2 className="reg-auth-form__title">{title}</h2>
        <input
          className="reg-auth-form__item"
          type="text"
          placeholder="Email"
          required
        />
        <input
          className="reg-auth-form__item"
          type="text"
          placeholder="Пароль"
          required
        />
        <button
          className="reg-auth-form__button"
          type="submit"
          aria-label="Кнопка регистрации"
        >
          {buttonText}
        </button>
        <span className="reg-auth-form__description">
          Уже зарегистрированы?
          <a> Войти</a>
        </span>
      </form>
    </section>
  );
};

export default RegAuthForm;
