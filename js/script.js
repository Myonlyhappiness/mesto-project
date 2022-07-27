//Работа с DOM
const cards = document.querySelector(".cards");
const popup = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile__info-edit");
const formButtons = document.querySelectorAll(".popup__container-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const popupEdit = document.querySelector(".popup-edit");
const popupAddCard = document.querySelector(".popup-add-card");
const profileName = document.querySelector(".profile__name");
const profileJobInfo = document.querySelector(".profile__job-info");
const popupNameField = popupEdit.querySelector("#name");
const popupJobField = popupEdit.querySelector("#job");
const profileAddButton = document.querySelector(".profile__add-button");
const likeButton = document.querySelectorAll(".card__like-icon");

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
  const card = document.createElement("article");
  card.classList.add("card");

  const cardPhoto = document.createElement("img");
  cardPhoto.classList.add("card__photo");
  cardPhoto.setAttribute("src", `${link}`);
  cardPhoto.setAttribute("alt", `${name}`);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("card__delete-icon");

  const cardСaption = document.createElement("div");
  cardСaption.classList.add("card__caption");

  const cardName = document.createElement("h2");
  cardName.classList.add("card__caption-text");
  cardName.textContent = name;

  const likeIcon = document.createElement("button");
  likeIcon.classList.add("card__like-icon");

  cardСaption.appendChild(cardName);
  cardСaption.appendChild(likeIcon);

  card.appendChild(cardPhoto);
  card.appendChild(deleteButton);
  card.appendChild(cardСaption);
  cards.insertBefore(card, cards.firstChild);
}

// Создание карточки на основе массива при загрузке страницы
initialCards.forEach(function (item) {
  let name = item.name;
  let link = item.link;
  createCard(link, name);
});

//Функция открытия и закрытия попапов
function popups(event) {
  if (
    (event.target.classList.contains("popup__close-button") &&
      popupEdit.classList.contains("popup_opened")) ||
    popupAddCard.classList.contains("popup_opened") ||
    popup.classList.contains("popup_img-opened")
  ) {
    popupEdit.classList.remove("popup_opened");
    popupAddCard.classList.remove("popup_opened");
    popup.classList.remove("popup_img-opened");
    document.querySelector(".general").style.overflow = "scroll";
  } else if (event.target.classList.contains("profile__add-button")) {
    popupAddCard.classList.add("popup_opened");
    document.querySelector(".general").style.overflow = "hidden";
  } else if (event.target.classList.contains("profile__info-edit")) {
    popupNameField.value = profileName.textContent;
    popupJobField.value = profileJobInfo.textContent;
    popupEdit.classList.add("popup_opened");
    document.querySelector(".general").style.overflow = "hidden";
  }
}

//Закрытие попапов по кнопке ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    popupEdit.classList.remove("popup_opened");
    popupAddCard.classList.remove("popup_opened");
    popup.classList.remove("popup_img-opened");
    document.querySelector(".general").style.overflow = "scroll";
  }
});

//Функции обработки форм
function editProfile(event) {
  event.preventDefault();
  profileName.textContent = popupNameField.value;
  profileJobInfo.textContent = popupJobField.value;
  popupEdit.classList.remove("popup_opened");
  if (profileName.textContent.length > 15) {
    profileName.style.width = "min-content";
  } else {
    profileName.style.width = "";
  }
}

function addCard(event) {
  event.preventDefault();
  const name = document.forms.add.elements.image.value;
  const link = document.forms.add.elements.link.value;
  createCard(link, name);
  document.forms.add.reset();
  popupAddCard.classList.remove("popup_opened");
  document.querySelector(".general").style.overflow = "scroll";
}

//Слушатели событий
profileEditButton.addEventListener("click", popups);
profileAddButton.addEventListener("click", popups);
popupCloseButtons.forEach((element) =>
  element.addEventListener("click", popups)
);
document.forms.edit.addEventListener("submit", editProfile);
document.forms.add.addEventListener("submit", addCard);

cards.addEventListener("click", function (event) {
  if (event.target.classList.contains("card__like-icon")) {
    event.target.classList.toggle("card_liked");
  } else if (event.target.classList.contains("card__delete-icon")) {
    cards.removeChild(event.target.closest(".card"));
  } else if (event.target.classList.contains("card__photo")) {
    const popupImgElem = document.querySelector(".popup__img-elem");
    const popupImgCaption = document.querySelector(".popup__img-caption");
    popupImgCaption.textContent = `${event.target.alt}`;
    popupImgElem.setAttribute("src", event.target.src);
    popup.classList.add("popup_img-opened");
    document.querySelector(".general").style.overflow = "hidden";
  }
});
