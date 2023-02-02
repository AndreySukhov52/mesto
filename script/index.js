import { Card } from './Card.js';
import { initialCards } from "./cards.js";
import { FormValidator } from './FormValidator.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
/** найти все popup */
const popups = document.querySelectorAll('.popup');
/** найти кнопку редактировать профиль */
const popupOpenEdit = document.querySelector('.profile__edit');
/** найти кнопку добавить */
const popupOpenCards = document.querySelector('.profile__add-button');
/** найти селектор popup профиля */
const popupProfile = document.querySelector('.popup_profile');
/** найти селектор блока popup_cards */
const popupCards = document.querySelector('.popup_cards');
/** найти селектор блока popup_photofull */
const popupPhotofull = document.querySelector('.popup_photofull');
/** найти форму редактировать профиль */
const popupFormProfile = document.forms.user_profile;
/** найти форму добавить место */
const popupFormCards = document.forms.add_cards;
/** найти элемент с классом .profile__name и записать в переменную profileName */
const profileName = document.querySelector('.profile__name');
/** найти элемент с классом .profile__about-me и записать в переменную profileAbout */
const profileAbout = document.querySelector('.profile__about-me');
/** найти input с классом .popup__input_item_name и записать в переменную valueName */
const valueName = document.querySelector('.popup__input_item_name');
/** найти input с классом .popup__input_item_job и записать в переменную valueJob */
const valueJob = document.querySelector('.popup__input_item_job');
/** найти элемент с классом .elements и записать в переменную containerElement */
const containerElement = document.querySelector('.elements');
/** найти элемент с классом .popup__title-mesto */
const titleMesto = document.querySelector('.popup__title-mesto');
/** найти элемент с классом .popup__fullscreen */
const fullscreen = document.querySelector('.popup__fullscreen');
/** найти input в форме добавить место с классом .popup__input_item_name-mesto*/
const inputNameMesto = document.querySelector('.popup__input_item_name-mesto');
/** найти input в форме добавить место с классом .popup__input_item_link*/
const inputItemLink = document.querySelector('.popup__input_item_link');
/** найти кнопку с классом .popup__button_submit_addcard */
const submitAddCard = document.querySelector('.popup__button_submit_addcard');
/** найти кнопку с классом .popup__button_submit_saveprofile */
const submitSaveProfile = document.querySelector('.popup__button_submit_saveprofile');

/** функция создания элемента */
const createElement = ({ name, link }) => {
  const card = new Card({ name, link }, '#element_template', openImagePopup);
  const element = card.generateCard();
  return element;
};

/** создаем элементы при загрузке страницы из данных массива initialCards */
initialCards.forEach((element) => {
  containerElement.prepend(createElement(element));
});

/** закрытие попап на клавишу ESC */
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

/** закрытие попап кликом на темный фон и кнопку закрытия */
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    const targetClassList = evt.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

/** добавляем модификатор popup_opened для открытия popup */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  /** добавляем слушатель при открытии попап */
  document.addEventListener('keydown', closeByEsc);
}

/** удаляем модификатор popup_opened у popup для закрытия */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  /** удаляем слушатель при закрытии попап */
  document.removeEventListener('keydown', closeByEsc);
}

/** В popup_profile добавляем значения из блока profile */
function openPropfilePopup() {
  valueName.value = profileName.textContent;
  valueJob.value = profileAbout.textContent;
  openPopup(popupProfile);
}

/** popup_photofull заполяем данными карточки name, link */
function openImagePopup(name, link) {
  titleMesto.textContent = name;
  fullscreen.src = link;
  fullscreen.alt = name;
  openPopup(popupPhotofull);
}

/** функция сохранения данных */
function saveValuePopup(evt) {
  /** Эта строчка отменяет стандартную отправку формы. */
  evt.preventDefault();
  /** записать текст из value переменной valueName */
  profileName.textContent = valueName.value;
  /** записать текст из value переменной valueJob */
  profileAbout.textContent = valueJob.value;
  closePopup(popupProfile);
};

/** функция создания элемента по данным из формы */
function saveCard(evt) {
  /** Эта строчка отменяет стандартную отправку формы. */
  evt.preventDefault();
  /** найти input значение value */
  const name = inputNameMesto.value;
  /** найти input значение value */
  const link = inputItemLink.value;
  containerElement.prepend(createElement({ name, link }));
  closePopup(popupCards);
  popupFormCards.reset();
};

/** слушаем кнопку редактировать профиль .Profile__edit */
popupOpenEdit.addEventListener('click', () => {
  openPropfilePopup();
  /** удаляем класс у кнопки и атрибут disabled */
  submitSaveProfile.classList.remove('popup__button_disabled');
  submitSaveProfile.removeAttribute('disabled', 'disabled');
});
/** слушаем кнопку добавить карточку с местом .profile__add-button */
popupOpenCards.addEventListener('click', () => {
  openPopup(popupCards);
  /** добавляем класс кнопке и атрибут disabled */
  submitAddCard.classList.add('popup__button_disabled');
  submitAddCard.setAttribute('disabled', 'disabled');
});
/** слушаем отправку формы по событию 'submit' */
popupFormProfile.addEventListener('submit', saveValuePopup);
/** слушаем отправку формы по событию 'submit' */
popupFormCards.addEventListener('submit', saveCard);

/** валидация формы профиля */
const validatorProfileForm = new FormValidator(validationConfig, popupFormProfile);
validatorProfileForm.enableValidation();

/** валидация формы добавления карточки */
const validatorAddCardForm = new FormValidator(validationConfig, popupFormCards);
validatorAddCardForm.enableValidation();