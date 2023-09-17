// ------------------добавление контактных данных----------------------

import { contactsForm } from "./delete-modal.js";

//функция добавления дополнительного контакта
export let addContactIndex = 0;

export function addContact() {
  const contactInput = document.createElement("div");
  contactInput.innerHTML = `
    <div class="form-contacts__select">
        <button class="dropdown__btn" id=${addContactIndex}>Телефон</button>
        <div class="dropdown">
        <ul class="dropdown__list list-reset">
            <li class="dropdown__item" data-value='phone'>
            <a href="#" class="dropdown__link">Телефон</a>
            </li>
            <li class="dropdown__item" data-value='addphone'>
            <a href="#" class="dropdown__link">Доп. телефон</a>
            </li>
            <li class="dropdown__item" data-value='email'>
            <a href="#" class="dropdown__link">Email</a>
            </li>
            <li class="dropdown__item" data-value='vk'>
            <a href="#" class="dropdown__link">Vk</a>
            </li>
            <li class="dropdown__item" data-value='facebook'>
            <a href="#" class="dropdown__link">Facebook</a>
            </li>
        </ul>
        </div>
    </div>

    <input
        type="text"
        value =""
        name="contats-input"
        id="form-contacts__input"
        placeholder="Введите данные контакта"
        class="form-contacts__input"
    />
    <button id="form-contacts__close" class="form-contacts__close"> </button>
    </div>
    `;

  contactInput.classList.add("form-contacts__contact");
  contactsForm.appendChild(contactInput);
  addContactIndex++;
  //закрытие окна ввода дополнительного контакта
  const contactClose = contactInput.querySelector("#form-contacts__close");
  contactClose.addEventListener("click", (e) => {
    e.preventDefault();
    contactsForm.removeChild(contactInput);
  });
}

//кастомный выпадающий список
export function dropdownselect() {
  const drop = document.querySelectorAll(".form-contacts__select");

  drop.forEach((dropdownWrapper) => {
    const dropdownBtn = dropdownWrapper.querySelector(".dropdown__btn");
    const dropdownList = dropdownWrapper.querySelector(".dropdown__list");
    const dropdownListItem = dropdownList.querySelectorAll(".dropdown__item");
    const dropdownLink = dropdownWrapper.querySelectorAll(".dropdown__link");

    dropdownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dropdownList.classList.toggle("dropdown__list--visible");
    });

    dropdownLink.forEach((listItem) => {
      listItem.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownBtn.textContent = listItem.textContent;
        dropdownList.classList.remove("dropdown__list--visible");
      });
    });

    //закрытие dropdown при клике снаружи
    document.addEventListener("click", (e) => {
      if (e.target !== dropdownBtn) {
        dropdownList.classList.remove("dropdown__list--visible");
      }
    });
  });
}

//функция скрытия кнопки добавления контакта
export function hideBtn(index, button) {
  if (index == 10) {
    button.classList.add("hidden");
  }
}
