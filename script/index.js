/** найти кнопку рекадтировать профиль */
const popupOpenEdit = document.querySelector('.profile__edit');
/** найти кнопку добавить */
const popupOpenCards = document.querySelector('.profile__add-button');
/** найти селектор блока popup */
const popupProfile = document.querySelector('.popup_profile');
/** найти селектор блока popup__add */
const popupCards = document.querySelector('.popup_cards');
/** найти форму с классом .popup__form */
const popupForm = document.forms.user_profile;
/** найти форму с классом .popup__form2 */
const popupFormCards = document.forms.add_cards;
/** найти кнопку закрыть в форме. */ 
const popupCloseProfile = document.querySelector('.popup__close_button_profile');
/** найти кнопку закрыть в форме. */ 
const popupCloseCards = document.querySelector('.popup__close_button_cards');
/** найти элемент с классом .profile__name и записать в переменную profileName */
let profileName = document.querySelector('.profile__name');
/** найти элемент с классом .profile__about-me и записать в переменную profileAbout */
let profileAbout = document.querySelector('.profile__about-me');
/** найти input с классом .popup__input_item_name и записать в переменную valueName */
let valueName = document.querySelector('.popup__input_item_name');
/** найти input с классом .popup__input_item_job и записать в переменную valueJob */
let valueJob = document.querySelector('.popup__input_item_job');



/** добавляем модификатор popup_opened блокуpopup_profile */
function openPopup() {
    popupProfile.classList.add('popup_opened');
    valueName.value = profileName.textContent;
    valueJob.value = profileAbout.textContent;  
}
/** добавляем модификатор popup_opened блоку popup_cards */
function openPopupCards() {
    popupCards.classList.add('popup_opened');
}    

/** удаляем модификатор popup_opened у элемента */
function closePopup() {
    popupProfile.classList.remove('popup_opened');
    popupCards.classList.remove('popup_opened');
}

/** функция сохранения данных */
function saveValuePopup(evt) {
    /** Эта строчка отменяет стандартную отправку формы. */
    evt.preventDefault();
    /** записать текст из value переменной valueName */ 
    profileName.textContent = valueName.value;
    /** записать текст из value переменной valueJob */         
    profileAbout.textContent = valueJob.value;
    closePopup();
};



/** слушаем кнопку редактировать профиль .Profile__edit */
popupOpenEdit.addEventListener('click', openPopup);
/** слушаем кнопку добавить карточку с местом .profile__add-button */
popupOpenCards.addEventListener('click', openPopupCards);
/** слушаем кнопку закрыть форму .popup__close */
popupCloseProfile.addEventListener('click', closePopup);
/** слушаем кнопку закрыть форму .popup__close */
popupCloseCards.addEventListener('click', closePopup);
/** слушаем отрпавку формы по событию 'submit' */
popupForm.addEventListener('submit', saveValuePopup);