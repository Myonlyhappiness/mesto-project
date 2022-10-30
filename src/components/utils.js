// Создание карточки
export default function createCard(link, name) {
  const template = document.querySelector("#element").content;
  const card = template.querySelector(".card").cloneNode(true);
  card.querySelector(".card__photo").src = link;
  card.querySelector(".card__photo").alt = name;
  card.querySelector(".card__caption-text").textContent = name;
  return card;
}


