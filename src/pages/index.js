import './index.css';

import {
  validationConfig,
  popupOpenEdit,
  selectorPopupEditForm,
  selectorUserName,
  selectorUserAbout,
  popupConfirmationDelete,
  avatarProfile,
  popupPhotofull,
  buttonUpdateAvatar,
  selectorPopupCreateForm,
  popupUpdateAvatar,
  popupOpenCards,
  template,
  containerElement
} from '../utils/constants.js';

import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupConfirmation } from '../components/PopupConfirmation';
import { Section } from '../components/Section';
import { UserInfo } from '../components/UserInfo';
import { Api } from '../utils/Api'

let userId;

function createCard(value, template) {
  const card = new Card(value, template, () => { popupPhotos.open({ value }) }, userId,
    async () => {
      try {
        const response = await api.addLike(value._id)
        card.like()
        card.likesCount(response)
      } catch (error) {
        return console.log(`Ошибка: ${error}`)
      }
    },
    async () => {
      try {
        const response = await api.removeLike(value._id)
        card.dislike()
        card.likesCount(response)
      } catch (error) {
        return console.log(`Ошибка: ${error}`)
      }
    },
    () => { popupConfirmation.open(card) },
  );
  return card.generateCard();
};

const userInfo = new UserInfo(selectorUserName, selectorUserAbout, avatarProfile);

const popupPhotos = new PopupWithImage(popupPhotofull);
popupPhotos.setEventListeners();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "8da28c3b-8ab9-43a4-aea6-1a07338d7f8b",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userProfile, cards]) => {
    user.setUserInfo(userProfile)

    userId = userProfile._id
    cardList.renderItems(cards)
  })
  .catch((error) => console.log(`Ошибка: ${error}`))

const popupConfirmation = new PopupConfirmation(
  popupConfirmationDelete,
  async (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        card.remove()
        popupConfirmation.close()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }
);


const cardList = new Section(
  {
    renderer: (value) => {
      cardList.addItem(createCard(value, template));
    }
  }, containerElement);




// Форма обновления аватара
async function handleSubmitFormUpdateAvatar(data) {
  try {
    const userProfile = await api.updateProfileAvatar(data);
    userInfo.setUserInfo(userProfile);
  } catch (error) {
    return console.log(`Ошибка: ${error}`);
  }
};
const popupAvatar = new PopupWithForm(
  avatarProfile,
  handleSubmitFormUpdateAvatar
);

// Форма редактирования профиля
async function handleSubmitFormEditProfile(data) {
  try {
    const userProfile = await api.editProfileUserInfo(data)
    user.setUserInfo(userProfile)
  } catch (error) {
    return console.log(`Ошибка: ${error}`)
  }
};

const popupEdit = new PopupWithForm(
  selectorPopupEditForm,
  handleSubmitFormEditProfile
);

// Форма добавления карточек
async function handleSubmitFormAddCard(data) {
  try {
    const newCard = await api.addNewCard(data)
    cardList.addItem(createCard(newCard))
  } catch (error) {
    return console.log(`Ошибка: ${error}`)
  }
};

const popupAdd = new PopupWithForm(
  selectorPopupCreateForm,
  handleSubmitFormAddCard
);

popupOpenEdit.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValue(user.getUserInfo());
  validatorProfileForm.switchErrorMode();
  validatorProfileForm.switchProfileButtonMode();
},
  false
);

buttonUpdateAvatar.addEventListener(
  "click",
  () => {
    popupAvatar.open();
    validatorFormUpdateAvatar.switchErrorMode();
    validatorFormUpdateAvatar.switchProfileButtonMode();
  },
  false
);

popupOpenCards.addEventListener('click', () => {
  validatorAddCardForm.switchErrorMode();
  validatorAddCardForm.switchProfileButtonMode();
  popupAdd.open();
});

/** валидация формы профиля */
const validatorProfileForm = new FormValidator(validationConfig, selectorPopupEditForm);
validatorProfileForm.enableValidation();

/** валидация формы добавления карточки */
const validatorAddCardForm = new FormValidator(validationConfig, selectorPopupCreateForm);
validatorAddCardForm.enableValidation();

/** валидация формы обновления аватара */
const validatorFormUpdateAvatar = new FormValidator(validationConfig, popupUpdateAvatar);
validatorFormUpdateAvatar.enableValidation();
