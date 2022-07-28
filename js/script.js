//Работа с DOM
const cards = document.querySelector(".cards");
const popup = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile__info-edit");
const formButtons = document.querySelectorAll(".popup__container-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const popupEdit = document.querySelector(".popup-edit");
const popupImg = document.querySelector(".popup-img");
const popupAddCard = document.querySelector(".popup-add-card");
const profileName = document.querySelector(".profile__name");
const profileJobInfo = document.querySelector(".profile__job-info");
const popupNameField = popupEdit.querySelector("#name");
const popupJobField = popupEdit.querySelector("#job");
const profileAddButton = document.querySelector(".profile__add-button");
const likeButton = document.querySelectorAll(".card__like-icon");
const formAddCardLink = document.forms.add.elements.link;
const formAddCardName = document.forms.add.elements.name;
const formEdit = document.forms.edit;
const formAdd = document.forms.add;
//Массив с исходными карточками
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Создание карточки
function createCard(link, name) {
  const template = document.querySelector("#element").content;
  const element = template.querySelector(".card").cloneNode(true);
  element.querySelector(".card__photo").src = link;
  element.querySelector(".card__caption-text").textContent = name;
  element.addEventListener("click", function (event) {
    if (event.target.classList.contains("card__like-icon")) {
      event.target.classList.toggle("card_liked");
    } else if (event.target.classList.contains("card__delete-icon")) {
      cards.removeChild(event.target.closest(".card"));
    } else if (event.target.classList.contains("card__photo")) {
      const popupImgElem = document.querySelector(".popup__img-elem");
      const popupImgCaption = document.querySelector(".popup__img-caption");
      popupImgCaption.textContent = `${event.target.alt}`;
      popupImgElem.setAttribute("src", event.target.src);
      opensPopup(event);
    }
  });
  return element;
}

// Создание карточки на основе массива при загрузке страницы
initialCards.forEach((item) => {
  const name = item.name;
  const link = item.link;
  cards.prepend(createCard(link, name));
});

//Функция открытия попапов
function opensPopup(event) {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closesPopup();
    }
  });

  if (event.target.classList.contains("profile__info-edit")) {
    popupEdit.classList.add("popup_opened");
    popupNameField.value = profileName.textContent;
    popupJobField.value = profileJobInfo.textContent;
    document.querySelector(".general").style.overflow = "hidden";
  } else if (event.target.classList.contains("profile__add-button")) {
    popupAddCard.classList.add("popup_opened");
    document.querySelector(".general").style.overflow = "hidden";
  } else if (event.target.classList.contains("card__photo")) {
    popupImg.classList.add("popup_img-opened");
    document.querySelector(".general").style.overflow = "hidden";
  }
}

//Функция закрытия попапов
function closesPopup() {
  popupEdit.classList.remove("popup_opened");
  popupAddCard.classList.remove("popup_opened");
  popup.classList.remove("popup_img-opened");
  formAdd.reset();
  document.querySelector(".general").style.overflow = "scroll";
  document.removeEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closesPopup();
    }
  });
}

//Функции обработки форм
function editProfile(event) {
  event.preventDefault();
  profileName.textContent = popupNameField.value;
  profileJobInfo.textContent = popupJobField.value;
  closesPopup();
  //Данная проверка нужна мне для более корректного отобржаения одного элмента верстки
  if (profileName.textContent.length > 15) {
    profileName.style.width = "min-content";
  } else {
    profileName.style.width = "";
  }
}

function addCard(event) {
  event.preventDefault();
  cards.prepend(createCard(formAddCardLink.value, formAddCardName.value));
  closesPopup();
}

//Слушатели событий
profileEditButton.addEventListener("click", opensPopup);
profileAddButton.addEventListener("click", opensPopup);
popupCloseButtons.forEach((element) =>
  element.addEventListener("click", closesPopup)
);
formEdit.addEventListener("submit", editProfile);
formAdd.addEventListener("submit", addCard);
