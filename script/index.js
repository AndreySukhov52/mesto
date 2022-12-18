const initialCards = [
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
/** найти кнопку рекадтировать профиль */
const popupOpenEdit = document.querySelector('.profile__edit');
/** найти кнопку добавить */
const popupOpenCards = document.querySelector('.profile__add-button');
/** найти селектор блока popup */
const popupProfile = document.querySelector('.popup_profile');
/** найти селектор блока popup__add */
const popupCards = document.querySelector('.popup_cards');
/** найти селектор блока popup_photofull */
const popupCardImage = document.querySelector('.popup_photofull');
/** найти форму с классом .popup__form */
const popupForm = document.forms.user_profile;
/** найти форму с классом .popup__form2 */
const popupFormCards = document.forms.add_cards;
/** найти кнопку закрыть в форме. */ 
const popupCloseProfile = document.querySelector('.popup__close_button_profile');
/** найти кнопку закрыть в форме. */ 
const popupCloseCards = document.querySelector('.popup__close_button_cards');
/** найти кнопку закрыть в форме. */ 
const popupCloseImage = document.querySelector('.popup__close_button_open-card');
/** найти элемент с классом .profile__name и записать в переменную profileName */
let profileName = document.querySelector('.profile__name');
/** найти элемент с классом .profile__about-me и записать в переменную profileAbout */
let profileAbout = document.querySelector('.profile__about-me');
/** найти input с классом .popup__input_item_name и записать в переменную valueName */
let valueName = document.querySelector('.popup__input_item_name');
/** найти input с классом .popup__input_item_job и записать в переменную valueJob */
let valueJob = document.querySelector('.popup__input_item_job');
/** найти элемент с классом .elements и записать в переменную containerElement */
const containerElement = document.querySelector('.elements');
/** найти элемент с id #element_template и записать в переменную template */
const template = document.querySelector('#element_template');


/** функция создания элемента из шаблона фото с наименованием места и кнопкой лайк */
const createElement = ({name, link}) => {
    const element = template.content.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = link;
    element.querySelector('.element__text').textContent = name;
    /** функция удаления элемента по кнопке .element__delete */
    const deleteElement = element.querySelector('.element__delete').addEventListener('click', () => {
        element.remove();
    });
    /** функция активации лайка по кнопке */
    const like = element.querySelector('.element__like').addEventListener('click', (e) => 
    e.target.classList.toggle('element__like_activ')
    );
    /** функция открытия popup для просомтра картинки */
    element.querySelector('.element__image').addEventListener('click', () =>  {
        openPopupImage({name, link})
    });
    /** возвращаем element */
    return element;
    };

/** создаем элементы при загрузке страницы из данных массива initialCards */
containerElement.append(...initialCards.map(createElement));
    
/** добавляем модификатор popup_opened для открытия popup_profile */
function openPopup() {
    popupProfile.classList.add('popup_opened');
    valueName.value = profileName.textContent;
    valueJob.value = profileAbout.textContent;  
}
/** добавляем модификатор popup_opened для открытия popup_cards */
function openPopupCards() {
    popupCards.classList.add('popup_opened');
}
/** добавляем модификатор popup_opened для открытия popup_photofull и заполяем данными {name, link} */
const openPopupImage = ({name, link}) => {
    popupCardImage.classList.add('popup_opened');
    const mesto = document.querySelector('.popup__title-mesto').textContent = name;
    const linkMesto = document.querySelector('.popup__fullscreen').src = link;
}

/** удаляем модификатор popup_opened у popup для закрытия */
function closePopup() {
    popupProfile.classList.remove('popup_opened');
    popupCards.classList.remove('popup_opened');
    popupCardImage.classList.remove('popup_opened');
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

/** функция создания элемента по данным из формы */
function saveCard(evt) {
  /** Эта строчка отменяет стандартную отправку формы. */
  evt.preventDefault();
  const name = document.querySelector('.popup__input_item_name-mesto').value;
  const link = document.querySelector('.popup__input_item_link').value;
  const addCard = containerElement.prepend(createElement({name, link}))
  closePopup()
  popupFormCards.reset();
};

/** слушаем кнопку редактировать профиль .Profile__edit */
popupOpenEdit.addEventListener('click', openPopup);
/** слушаем кнопку добавить карточку с местом .profile__add-button */
popupOpenCards.addEventListener('click', openPopupCards);
/** слушаем кнопку закрыть форму popupCloseProfile */
popupCloseProfile.addEventListener('click', closePopup);
/** слушаем кнопку закрыть форму popupCloseCards */
popupCloseCards.addEventListener('click', closePopup);
/** слушаем кнопку закрыть форму popupCloseImage */
popupCloseImage.addEventListener('click', closePopup);
/** слушаем отправку формы по событию 'submit' */
popupForm.addEventListener('submit', saveValuePopup); 
/** слушаем отправку формы по событию 'submit' */
popupFormCards.addEventListener('submit', saveCard);
