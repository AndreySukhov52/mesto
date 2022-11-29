const popupOpen = document.querySelector('.Profile__edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupButtonSave = document.querySelector('.popup__button');

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

function openPopup() {
    popup.classList.add('popup__opened');
}

function closePopup() {
    popup.classList.remove('popup__opened');
}

popup.addEventListener('click', function(event) {
    if(event.target === event.currentTarget) {
        closePopup();
    }
});


console.log('popupOpen, popupButtonSave, popup, popupClose')
