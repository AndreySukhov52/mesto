export const template = '#element_template';
/** найти элемент с классом .elements и записать в переменную containerElement */
export const containerElement = document.querySelector('.elements');
/** найти селектор блока popup_cards */
export const popopCards = '.popup_cards';
/** найти селектор блока popup_profile */
export const popopProfile = '.popup_profile';
/** найти селектор блока popup_type_update-avatar */
export const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
/** найти селектор блока popup_type_confirmation */
export const popopConfirmationDel = '.popup_type_confirmation';
/** найти селектор блока popup_photofull */
export const popupPhotofull = '.popup_photofull';

/** найти элемент с классом .profile__name и записать в переменную profileName */
export const selectorUserName = '.profile__name';
/** найти элемент с классом .profile__about-me и записать в переменную profileAbout */
export const selectorUserAbout = '.profile__about-me';
/** найти элемент с классом .profile__avatar и записать в переменную popupAvatarProfile */
export const avatarProfile = '.profile__avatar';

/** найти форму редактировать профиль */
export const popupFormProfile = document.forms.user_profile;
/** найти форму добавить место */
export const popupFormCards = document.forms.add_cards;

/** найти кнопку редактировать профиль */
export const popupOpenEdit = document.querySelector('.profile__edit');
/** найти кнопку добавить */
export const popupOpenCards = document.querySelector('.profile__add-button');
/** найти кнопку редактировать аватар */
export const buttonUpdateAvatar = document.querySelector('.profile__edit-avatar');

/** начальный массив */
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
/** конфиг валидации */
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
