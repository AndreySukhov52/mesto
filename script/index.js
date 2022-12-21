/** найти кнопку рекадтировать профиль */
const popupOpenEdit = document.querySelector('.profile__edit');
/** найти кнопку добавить */
const popupOpenCards = document.querySelector('.profile__add-button');
/** найти селекторы блоков popup */
const popups = document.querySelectorAll('.popup');
/** найти селектор блока popup */
const popup = document.querySelector('.popup');
/** найти форму редактировать профиль */
const popupFormProfile = document.forms.user_profile;
/** найти форму добавить место */
const popupFormCards = document.forms.add_cards;
/** найти кнопку закрыть в форме. */ 
const buttonCloseList = document.querySelectorAll('.popup__close');
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
/** найти элемент с id #element_template и записать в переменную template */
const template = document.querySelector('#element_template');
/** найти input в форме добавить место с классом .popup__input_item_name-mesto*/
const inputNameMesto = document.querySelector('.popup__input_item_name-mesto');
/** найти input в форме добавить место с классом .popup__input_item_link*/
const inputItemLink = document.querySelector('.popup__input_item_link');


/** функция создания элемента из шаблона фото с наименованием места и кнопкой лайк */
const createElement = ({name, link}) => {
    const element = template.content.querySelector('.element').cloneNode(true);
    const elementImg = element.querySelector('.element__image');
    elementImg.src = link;
    elementImg.alt = name;
    element.querySelector('.element__text').textContent = name;
    /** функция удаления элемента по кнопке .element__delete */
    element.querySelector('.element__delete').addEventListener('click', () => {
        element.remove();
    });
    /** функция активации лайка по кнопке */
    element.querySelector('.element__like').addEventListener('click', (e) => 
    e.target.classList.toggle('element__like_activ')
    );
    /** функция открытия popup для просомтра картинки */
    element.querySelector('.element__image').addEventListener('click', () =>  {
      openImagePopup({name, link})
    });
    /** возвращаем element */
    return element;
    };

/** создаем элементы при загрузке страницы из данных массива initialCards */
containerElement.append(...initialCards.map(createElement));
    
/** добавляем модификатор popup_opened для открытия popup_profile */
function openPopup(index) {
    popups[index].classList.toggle('popup_opened');    
}

  /** удаляем модификатор popup_opened у popup для закрытия */
  function closePopup(index) {
    popups[index].classList.remove('popup_opened');
  }

  function closePopups(popup) {
    popup.classList.remove('popup_opened');
  }

/** В popup_profile добавляем значения из блока profile */
function openPropfilePopup() { 
  valueName.value = profileName.textContent;
  valueJob.value = profileAbout.textContent;  
  } 
  
/** popup_photofull заполяем данными карточки {name, link} */
const openImagePopup = ({name, link}) => {
    document.querySelector('.popup__title-mesto').textContent = name;
    document.querySelector('.popup__fullscreen').src = link;
    openPopup(2);
}

/** функция сохранения данных */
function saveValuePopup(evt) {
    /** Эта строчка отменяет стандартную отправку формы. */
    evt.preventDefault();
    /** записать текст из value переменной valueName */ 
    profileName.textContent = valueName.value;
    /** записать текст из value переменной valueJob */         
    profileAbout.textContent = valueJob.value;
    closePopup(0);
};

/** функция создания элемента по данным из формы */
function saveCard(evt) {
  /** Эта строчка отменяет стандартную отправку формы. */
  evt.preventDefault();
  /** найти input значение value */
const name = inputNameMesto.value;
/** найти input значение value */
const link = inputItemLink.value;
  containerElement.prepend(createElement({name, link}))
  closePopup(1)
  popupFormCards.reset();
};

/** слушаем кнопку редактировать профиль .Profile__edit */
popupOpenEdit.addEventListener('click', ()=> openPopup(0), openPropfilePopup());
/** слушаем кнопку добавить карточку с местом .profile__add-button */
popupOpenCards.addEventListener('click', ()=> openPopup(1));
/** слушаем кнопки закрыть форму popupCloseProfile */
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopups(popup)); 
}) 
/** слушаем отправку формы по событию 'submit' */
popupFormProfile.addEventListener('submit', saveValuePopup); 
/** слушаем отправку формы по событию 'submit' */
popupFormCards.addEventListener('submit', saveCard);


