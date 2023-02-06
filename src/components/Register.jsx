import React, { useState } from "react";
import * as auth from "./Auth";

const Register = ({ title, buttonText }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = formValue;
    auth.register(password, email);
  };

  return (
    <section className="reg-auth">
      <form className="reg-auth-form" onSubmit={handleSubmit} noValidate>
        <h2 className="reg-auth-form__title">{title}</h2>
        <input
          className="reg-auth-form__item"
          type="text"
          placeholder="Email"
          name="email"
          value={formValue.email || ""}
          onChange={handleChange}
          required
        />
        <input
          className="reg-auth-form__item"
          type="text"
          placeholder="Пароль"
          name="password"
          value={formValue.password || ""}
          onChange={handleChange}
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

export default Register;
