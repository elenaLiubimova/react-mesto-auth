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

  return (
    <CurrentUserContext.Provider value={{ currentUser, cards }}>
      <>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
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
