const popupOpen = document.querySelector('.profile__edit'); // найти кнопку рекадтировать профиль
const popup = document.querySelector('.popup');             // найти селектор блока popup       
const popupClose = document.querySelector('.popup__close'); // найти кнопку закрыть в форме.
const popupButtonSave = document.querySelector('.popup__button'); // найти кнопка сохранить в форме.

popupOpen.addEventListener('click', openPopup); // слушаем кнопку редактировать профиль .Profile__edit
popupClose.addEventListener('click', closePopup); // слушаем кнопку закрыть форму .popup__close
popupButtonSave.addEventListener('click', saveValuePopup); // слушаем кнопку сохранить .popup__button


function openPopup() {
    popup.classList.add('popup__opened'); // добавляем класс элементу popup__opened
}

function closePopup() {
    popup.classList.remove('popup__opened'); // удаляем класс popup__opened у элемента
}

popup.addEventListener('click', function(event) {  // сравниваем значение события event.target и event.currentTarget, если равны то выполняем функцию закрытия popup
    if(event.target === event.currentTarget) {
        closePopup();
    }
});

function saveValuePopup(evt) {
    let valueName = document.querySelector('.popup__item-name').value; // найти значение value у элемента с классом .popup__item-name
    let valueJob = document.querySelector('.popup__item-job').value;   // найти значение value у элемента с классом .popup__item-job
    document.querySelector('.profile__name').innerHTML = valueName;    //  найти элемент с классом .Profile__name и записать в HTML значения из переменной valueName         
    document.querySelector('.profile__about-me').innerHTML = valueJob; // найти элемент с классом .Profile__about-me и записать в HTML значения из переменной valueJob
    evt.preventDefault();  // Эта строчка отменяет стандартную отправку формы.
};

document.addEventListener('keydown', function (e) { //слушаем нажатие клавиш на клавиатуре
    if (e.which === 13) {      // если код нажатой клавиши равен 13(клавиша enter)
            saveValuePopup(); // выполняем функцию сохранения данных
    }
});
