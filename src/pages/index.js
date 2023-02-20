import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { 
  initialCards,
  validationConfig,
  popupOpenEdit,
  selectorPopupEditForm,
  selectorUserName,
  selectorUserAbout,
  popupFormProfile,
  popupOpenCards,
  selectorPopupCreateForm,
  popupFormCards,
  fullscreen,
  titleMesto
} from '../utils/constants.js';
import './index.css';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';

const user = new UserInfo({ selectorUserTitle: selectorUserName, selectorUserInfo: selectorUserAbout });

const popupImage = new PopupWithImage('.popup_photofull', fullscreen, titleMesto);
popupImage.setEventListeners();

function handleCardClick() {
  popupImage.openPopup(this.getCardName(), this.getCardLink());
}

/** функция создания элемента */
const createElement = ({ name, link }) => {
  const card = new Card({ name, link }, handleCardClick, '#element_template');
  const element = card.generateCard();
  return element;
};

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createElement(item);
    cardsList.addItem(card);
  }
},
  '.elements'
);
cardsList.renderItems();

const popupEditForm = new PopupWithForm(selectorPopupEditForm, (userData) => {
  user.setUserInfo(userData);
});

popupEditForm.setEventListeners();

popupOpenEdit.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  popupEditForm.setInputValues(userInfo);
  validatorProfileForm.resetValidation();
  validatorProfileForm.switchProfileButtonMode();
  popupEditForm.openPopup();
});

const popupCreateForm = new PopupWithForm(selectorPopupCreateForm, ({ name, link }) => {
  const newCard = createElement({ name, link });
  cardsList.addLeftItem(newCard);
});

popupCreateForm.setEventListeners();

popupOpenCards.addEventListener('click', () => {
  validatorAddCardForm.resetValidation();
  validatorAddCardForm.disableAddCardPopupButton();
  popupCreateForm.openPopup();

});

/** валидация формы профиля */
const validatorProfileForm = new FormValidator(validationConfig, popupFormProfile);
validatorProfileForm.enableValidation();

/** валидация формы добавления карточки */
const validatorAddCardForm = new FormValidator(validationConfig, popupFormCards);
validatorAddCardForm.enableValidation();
