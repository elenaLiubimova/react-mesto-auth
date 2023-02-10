import React, { useState } from "react";

const Login = ({ handleAuthorize }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleAuthorize(formValue.email, formValue.password);
  };

  return (
    <section className="reg-auth">
      <form className="reg-auth-form" onSubmit={handleSubmit} noValidate>
        <h2 className="reg-auth-form__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
