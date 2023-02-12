import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegister }) => {
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
    handleRegister(email, password);
  };

  return (
    <section className="reg-auth">
      <form className="reg-auth-form" onSubmit={handleSubmit} noValidate>
        <h2 className="reg-auth-form__title">Регистрация</h2>
        <input
          className="reg-auth-form__item"
          type="email"
          placeholder="Email"
          name="email"
          value={formValue.email || ""}
          onChange={handleChange}
          required
        />
        <input
          className="reg-auth-form__item"
          type="password"
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
          Зарегистрироваться
        </button>
        <span className="reg-auth-form__description">
          Уже зарегистрированы?
          <Link to="/sign-in" className="reg-auth-form__link"> Войти</Link>
        </span>
      </form>
    </section>
  );
};

export default Register;
