import './index.css';

import {
	initialCards,
	validationConfig,
	template,
	popopCards,
	popopProfile,
	popopConfirmationDel,
	containerElement,
	popupPhotofull,
	selectorUserName,
	selectorUserAbout,
	avatarProfile,
	popupFormProfile,
	popupFormCards,
	popupUpdateAvatar,
	popupOpenEdit,
	popupOpenCards,
	buttonUpdateAvatar
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirmation from '../components/PopupConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../utils/Api.js';

/** Подключить API */
const api = new Api({
	baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
	headers: {
		authorization: "8da28c3b-8ab9-43a4-aea6-1a07338d7f8b",
		"Content-Type": "application/json",
	},
});

/** валидация формы профиля */
const validatorProfileForm = new FormValidator(validationConfig, popupFormProfile);
validatorProfileForm.enableValidation();

/** валидация формы добавления карточки */
const validatorAddCardForm = new FormValidator(validationConfig, popupFormCards);
validatorAddCardForm.enableValidation();

/** валидация формы обновления аватара */
const validatorFormUpdateAvatar = new FormValidator(validationConfig, popupUpdateAvatar);
validatorFormUpdateAvatar.enableValidation();

let userId = null;

/** Создание новой карточки */
const createCard = (data, userId) => {
	const card = new Card(data, userId, template,
		function handleCardClick(name, link) {
			popupPhotos.open(name, link);
		},
		function handleLikeClick(cardId) {
			card.checkUserLikes()
				? api
					.deleteLike(cardId)
					.then((res) => {
						card.setLikes(res.likes)
					})
					.catch((error) => console.log(`Ошибка: ${error}`))
				: api
					.addLike(cardId)
					.then((res) => {
						card.setLikes(res.likes)
					})
					.catch((error) => {
						console.log(`Ошибка: ${error}`)
					})
		},
		function handleDeleteButtonClick(card) {
			popupConfirmation.open(card);
		}
	);
	const cardElement = card.createElements();
	return cardElement;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then(([data, items]) => {
		userInfo.setUserInfo(data)
		// userInfo.setUserAvatar(user.avatar)
		userId = data._id
		renderInitialCards(items)
	})
	.catch((error) => {
		console.log(`Ошибка: ${error}`)
	})

/**  Подтверждение удаления карточки */
const popupConfirmation = new PopupConfirmation(
	popopConfirmationDel,
	function handleDeleteClick(card) {
		popupConfirmation.renderLoading(true);
		api.deleteCard(card._cardId)
			.then(() => {
				card.delCard();
				popupConfirmation.close();
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`)
			})
			.finally(() => {
				popupConfirmation.renderLoading(false)
			})
	}
);
popupConfirmation.setEventListeners();

/**  Функция попапа увеличения картинки */
const popupPhotos = new PopupWithImage(popupPhotofull);
popupPhotos.setEventListeners();

const userInfo = new UserInfo({
	userName: selectorUserName,
	userInfo: selectorUserAbout,
	userAvatar: avatarProfile
});

/**  Класс Section */
const cardElementList = new Section(
	{
		data: initialCards,
		renderer: (item) => {
			cardElementList.addItemAppend(createCard(item, userId))
		},
	},
	containerElement
);
const renderInitialCards = (items) => {
	cardElementList.renderItems(items)
};

/**  Добавление новой карточки */
const popupAddCardForm = new PopupWithForm(popopCards,
	(data) => {
		popupAddCardForm.renderLoading(true);
		api.addCard(data.inputNameCard, data.inputUrlCard).then((data) => {
			cardElementList.addItem(createCard(data, userId));
			popupAddCardForm.close();
		}).catch((error) => {
			console.error(`Ошибка: ${error}`);
		}).finally(() =>
			popupAddCardForm.renderLoading(false));
	});
popupAddCardForm.setEventListeners();

/**  Открываем и обновляем попап с карточками */
popupOpenCards.addEventListener('click', function () {
	validatorAddCardForm.resetValidation(); 		  // сброс ошибок валидации
	validatorAddCardForm.disableSubmitButton(); // выключение кнопки сохранить
	popupAddCardForm.open();
});

/**  Pедактирование информации name и about-me  */
const updateProfile = new PopupWithForm(popopProfile, (data) => {
	updateProfile.renderLoading(true);
	api.changeUserInfo(data.inputName, data.inputAbout).then((data) => {
		userInfo.setUserInfo(data);
		updateProfile.close()
	}).catch((error) => {
		console.error(`Ошибка: ${error}`);
	}).finally(() => {
		updateProfile.renderLoading(false);
	})
});
updateProfile.setEventListeners();

/**  Клик на кнопке редактирования информации о профиле */
popupOpenEdit.addEventListener('click', () => {
	validatorProfileForm.resetValidation();           // сброс ошибок валидации
	validatorProfileForm.enableSubmitButton();   // включение кнопки сохранить
	const { name, about } = userInfo.getUserInfo();
	inputName.value = name;
	inputAbout.value = about;
	updateProfile.open();
});

/**  Сменить аватар профиля */
const updateAvatar = new PopupWithForm('.popup_type_update-avatar', () => {
	updateAvatar.renderLoading(true);
	api.changeUserAvatar(inputAvatarName.value).then((data) => {
		userInfo.setUserInfo(data);
		updateAvatar.close();
	}).catch((error) => {
		console.error(`Ошибка: ${error}`);
	}).finally(() => {
		updateAvatar.renderLoading(false);
	});
});
updateAvatar.setEventListeners();

/** Клик на кнопке редактирования аватара */
buttonUpdateAvatar.addEventListener('click', () => {
	validatorFormUpdateAvatar.resetValidation();			// сброс ошибок валидации
	validatorFormUpdateAvatar.disableSubmitButton();  // выключение кнопки сохранить

	updateAvatar.open();
});



