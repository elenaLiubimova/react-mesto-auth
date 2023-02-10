import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import success from "../images/success.svg";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

const App = () => {
  // Переменная состояния попапа установки аватара
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  // Переменная состояния попапа редактирования профиля
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  // Переменная состояния попапа добавления карточки
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  // Переменная состояния полноразмерной карточки
  const [selectedCard, setSelectedCard] = useState(null);
  // Переменная состояния для информации профиля
  const [currentUser, setCurrentUser] = useState({});
  // Переменная состояния для массива карточек
  const [cards, setCards] = useState([]);
  // Переменная статуса пользователя
  const [loggedIn, setLoggedIn] = useState(false);

  const [userData, setUserData] = useState({email:"", password:""});

  const navigate = useNavigate();

  // Обработчик лайка карточки
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на карточке
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cardsArr) =>
          cardsArr.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  // Функция обработки удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((chekedCard) => chekedCard._id !== card._id));
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  // Функция эффекта для данных профиля и карточки
  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([currentUser, cards]) => {
        setCurrentUser(currentUser);
        setCards(cards);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

  // Обработчик кнопки редактирования аватара
  function handleEditAvatarClick() {
    setAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  // Обработчик кнопки редактирования профиля
  function handleEditProfileClick() {
    setProfilePopupOpen(!isEditProfilePopupOpen);
  }

  // Обработчик кнопки добавления карточки
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  // Обработчик открытия полноразмерной карточки
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  // Обработчик закрытия всех попапов
  function closeAllPopups() {
    setSelectedCard(null);
    setAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
  }

  // Обработчик добавления новой карточки
  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  // Функция обновления данных профиля
  function handleUpdateUser({ name, about }) {
    api
      .setProfileInfo(name, about)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  // Обработчик попапа смены аватара
  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        navigate("/", { replace: true });
        return res;
      })
      .catch((err) => console.log(err));
  }

  function handleAuthorize(email, password) {
    return auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        // if (data.jwt) {
        //   localStorage.setItem("token", data.token);
        //   setUserData({
        //     email: data.user.email,
        //     password: data.user.password,
        //   })
        //   return data;
        // }
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, cards }}>
      <>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register handleRegister={handleRegister} />
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleAuthorize={handleAuthorize} />}
          />
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/sign-in" replace={true} />
              )
            }
          />
        </Routes>
        <Footer />
        {/* <InfoTooltip infoTooltipIcon={success} infoTooltipDescription={'Вы успешно зарегистрировались!'}/> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </>
    </CurrentUserContext.Provider>
  );
};

export default App;
