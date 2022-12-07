/** найти кнопку рекадтировать профиль */
const popupOpen = document.querySelector('.profile__edit');
/** найти селектор блока popup */
const popup = document.querySelector('.popup');
/** найти форму с классом .popup__form */
const popupForm = document.querySelector('.popup__form');
/** найти кнопку закрыть в форме. */ 
const popupClose = document.querySelector('.popup__close');
/** найти элемент с классом .profile__name и записать в переменную profileName */
let profileName = document.querySelector('.profile__name');
/** найти элемент с классом .profile__about-me и записать в переменную profileAbout */
let profileAbout = document.querySelector('.profile__about-me');
/** найти input с классом .popup__input_item_name и записать в переменную valueName */
let valueName = document.querySelector('.popup__input_item_name');
/** найти input с классом .popup__input_item_job и записать в переменную valueJob */
let valueJob = document.querySelector('.popup__input_item_job');



/** добавляем модификатор popup_opened блоку popup */
function openPopup() {
    popup.classList.add('popup_opened');
    valueName.value = profileName.textContent;
    valueJob.value = profileAbout.textContent;  
}

/** удаляем модификатор popup_opened у элемента */
function closePopup() {
    popup.classList.remove('popup_opened');
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
popupOpen.addEventListener('click', openPopup);
/** слушаем кнопку закрыть форму .popup__close */
popupClose.addEventListener('click', closePopup);
/** слушаем отрпавку формы по событию 'submit' */
popupForm.addEventListener('submit', saveValuePopup);