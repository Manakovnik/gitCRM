import {
  loadClients,
  addClient,
  deleteClient,
  getCurrentClient,
  changeClient,
} from "./local-host.js";
import { showTooltip, showContactsIcons } from "./contacts-icons.js";
import { sortedRows, sortColumns } from "./sort-rows.js";
import { filteredClients } from "./search.js";
import { closeClientWindow, openWindow, closeWindow } from "./modal-window.js";
import {
  addContactIndex,
  addContact,
  hideBtn,
  dropdownselect,
} from "./add-contact.js";
import { deleteClientConfirm, contactsForm } from "./delete-modal.js";

// массив с клиентами
export let allClients = [];

// загружаем информацию с сервера
await loadClients();
allClients = [...(await loadClients(allClients))];

export let clientId; // создаем переменную в которую потом будем записывать id клиента

//поле ввода для поиска
export const searchField = document.getElementById("searchField");

//таблица и заголовки таблицы (сортировка)
const table = document.getElementById("table__body");
const tableID = document.getElementById("table-ID");
const tableFIO = document.getElementById("table-FIO");
const tableCreationDate = document.getElementById("table-creationDate");
const tableChangeDate = document.getElementById("table-changeDate");
const tableArrowId = document.getElementById("arrow-id");
const tableArrowFIO = document.getElementById("arrow-fio");
const tableArrowCreationDate = document.getElementById("arrow-creationDate");
const tableArrowChangeDate = document.getElementById("arrow-changeDate");

//кнопка на главной странице (добавить клиента)
export const clientAddTableBtn = document.getElementById("clientAddTableBtn");

//поля ввода и кнопкии в окне изменения
export const addSurname = document.getElementById("addSurname");
export const addName = document.getElementById("addName");
export const addLastName = document.getElementById("addLastName");
export const addContactBtn = document.getElementById("addContact");
export const addContactInputForm = document.querySelector(".add-btn");
export const saveClientBtn = document.getElementById("saveClient");
export const deleteClientBtn = document.getElementById("deleteClient");
export const clientIdNumber = document.getElementById("change-data__id");

//элементы селекта
const phoneSelect = document.getElementById("phoneSelect");
const addPhoneSelect = document.getElementById("add-phoneSelect");
const emailSelect = document.getElementById("emailSelect");
const vkSelect = document.getElementById("vkSelect");
const facebookSelect = document.getElementById("facebookSelect");
export const contactInput = document.getElementById("form-contacts__input");

//закрываем-открываем модальное окно
clientAddTableBtn.addEventListener("click", () => {
  clientAddTableBtn.classList.add("btn__submit--active");
  const timer = setTimeout(() => {
    // таймер для анимации кнопки при нажатии
    openWindow();
    clearTimeout(timer);
    clientAddTableBtn.classList.remove("btn__submit--active");
  }, 500);
});

closeClientWindow.addEventListener("click", () => {
  closeWindow();
});

// загружаем клиентов с сервера и делаем отрисовку таблицы
await loadClients(allClients);
createTable(await loadClients(allClients));

//функция оотрисовки таблицы
export function createTable(arr) {
  table.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let id = arr[i].id;
    let fio = arr[i].surname + " " + arr[i].name + " " + arr[i].lastName;
    let createdAt = arr[i].createdAt;
    let updatedAt = arr[i].updatedAt;
    let contacts = arr[i].contacts;
    let contactsIcons;

    //форматируем время приходящее с сервера
    let createdDate = new Date(createdAt).toLocaleDateString();
    let createdTime = new Date(createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let updatedDate = new Date(updatedAt).toLocaleDateString();
    let updatedTime = new Date(updatedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    //добавляем кнопки "изменить" и "удалить" в таблицу
    const row = document.createElement("tr");
    const td = document.createElement("td");
    const clientDeleteTableBtn = document.createElement("button");
    clientDeleteTableBtn.classList.add(
      "table__row--change-btn",
      "delete-btn-row"
    );
    clientDeleteTableBtn.textContent = "Удалить";
    clientDeleteTableBtn.setAttribute("data-rowId", arr[i].id);

    const clientChangeTableBtn = document.createElement("button");
    clientChangeTableBtn.classList.add(
      "table__row--change-btn",
      "change-btn-row"
    );
    clientChangeTableBtn.textContent = "Изменить";
    clientChangeTableBtn.setAttribute("data-rowId", arr[i].id);

    //рисуем таблицу
    row.innerHTML = `
            <td class="table__body--id">${id}</td>
            <td class="table__body--main-text">${fio}</td>
            <td class="table__body--secondary-text">${
              createdDate + "   "
            }<span class="table__body--creation-time">${
      "   " + createdTime
    }</span></td>
            <td class="table__body--secondary-text">${
              updatedDate + "   "
            }<span class="table__body--creation-time">${
      "   " + updatedTime
    }</span></td>
          `;

    // рисуем иконки контактов
    function icons() {
      if (contacts.length > 0) {
        const td = document.createElement("td");
        td.classList.add("table__icons");

        for (let i = 0; i < contacts.length; i++) {
          //проходим циклом по контактам каждого клиента
          const div = document.createElement("div");
          div.classList.add("contact-img");
          const spanTooltip = document.createElement("span");
          spanTooltip.classList.add("tooltip");
          spanTooltip.textContent = `${contacts[i].value}`; //записываем value контакта в тултип

          const contactsIconsClassName = showContactsIcons(contacts[i].type); //определяем css класс контакта для отрисовки иконки

          div.classList.add(contactsIconsClassName);
          div.appendChild(spanTooltip);
          td.appendChild(div);
        }

        row.appendChild(td);
        return td;
      }
    }
    icons();

    row.appendChild(td);
    td.appendChild(clientChangeTableBtn);
    row.appendChild(td);
    td.appendChild(clientDeleteTableBtn);
    table.appendChild(row);
  }
  showTooltip(); //запускаем отрисовку тултипов
}

//-----------------------------добаление нового клиента на сервер
saveClientBtn.addEventListener("click", async () => {
  // валидация данных
  const validator = new JustValidate("#add-client-form");
  validator
    .addField("#addSurname", [
      {
        rule: "required",
        errorMessage: "Введите фамилию",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Введите фамилию",
      },
      {
        rule: "maxLength",
        value: 20,
        errorMessage: "Фамилия слишком большая",
      },
    ])
    .addField("#addName", [
      {
        rule: "required",
        errorMessage: "Введите имя",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Введите имя",
      },
      {
        rule: "maxLength",
        value: 20,
        errorMessage: "Имя слишком большое",
      },
    ])
    .onSuccess(async (e) => {
      // если валидация прошла успешно
      e.preventDefault();
      if (addContactIndex != 0) {
        // проверяем был ли добавлен хотябы 1 контакт
        addClient(clientId); // добавляем клинта на сервер

        closeWindow(); // закрываем модальное окно
        createTable(await loadClients(allClients)); //перерисовываем талицу
        location.reload(); // перезагружаем страницу
      } else {
        alert("Добавьте хотябы 1 контакт!");
      }
    });

  return;
});

//--------------------------------удаление клиента с сервера

const deleteClientButton = document.querySelectorAll(".delete-btn-row");
deleteClientButton.forEach((el) => {
  el.addEventListener("click", async (e) => {
    clientId = e.target.getAttribute("data-rowId");
    console.log(clientId); // у кнопок "удалить" и "изменить" есть data-атрибут равный id клиента, который создается при создании этих кнопок при создании клиента
    if (
      e.target.classList.contains("delete-btn-row") && // проверяем - есть ли класс у того элемента по которому был клик
      clientId != "undefined" // проверяем - есть ли id у того элемента по которому был клик
    ) {
      await deleteClientConfirm(clientId); // запускаем функцию подтверждения удаления клиента
      createTable(await loadClients(allClients)); // перерисовываем  таблицу
    }
  });
});

//------------------------------ изменение данных клиента
//кнопка "изменить"
const changeClientButton = document.querySelectorAll(".table__row--change-btn");
changeClientButton.forEach((el) => {
  el.addEventListener("click", async (e) => {
    closeClientWindow.classList.add("hidden"); //  тут кастыль! если не скрыть эту кнопку - клиент все равно удалится, даже если изменения не будут сохранены. поэтому убираем эту кнопку совсем

    clientId = e.target.getAttribute("data-rowId"); // у кнопок "удалить" и "изменить" есть data-атрибут равный id клиента, который создается при создании этих кнопок при создании клиента
    clientIdNumber.textContent = `ID: ${clientId}`; // отображаем id в модальном окне

    if (clientId !== "undefined") {
      // проверяем - есть ли id у того элемента по которому был клик
      openWindow(); // открываем модальное окно
      clientSelected(await getCurrentClient(clientId)); // запускаем функцию заполнения инпутов и селектов данными выбранного клиента
    }
  });

  document.querySelector(".save-btn").addEventListener("click", () => {
    deleteClient(clientId); //  тут кастыль! изменение клиента changeClient(id) пока не работает, поэтому изменение работает так: добавляем еще одного клиента с уже измененными данными, а старого удаляем. Но, из-за этого при каждом изменении клиента у него новый id.
  });
});

//функция запонения полей в модальном окне данными клиента
function clientSelected(obj) {
  const contacts = [];

  addName.value = obj.name;
  addSurname.value = obj.surname;
  addLastName.value = obj.lastName;

  for (let i = 0; i < obj.contacts.length; i++) {
    addContact(); // отрисовка поля ввода контакта
    let type = obj.contacts[i].type;
    let value = obj.contacts[i].value;
    const dropdownBtn = document.querySelectorAll(".dropdown__btn");
    dropdownBtn[i].textContent = type; // записываем данные контактов в dropdown
    const input = document.querySelectorAll("#form-contacts__input");
    input[i].value = value; // записываем данные контактов в input
  }

  // кнопка удаления выбранного клиента
  deleteClientBtn.addEventListener("click", async () => {
    await deleteClientConfirm();
  });
}

//----------------------------добавление дополнительного контакта (максимум 10. когда 10 - кнопка исчезает)
const addMoreContactsBtn = document.querySelector(".form-contacts__add-btn");

addContactInputForm.addEventListener("click", () => {
  if (contactsForm.children.length < 10) {
    addContact(); //рисуем поле ввода контакта
    dropdownselect(); //создаем выпадающий список
  }

  hideBtn(addContactIndex, addMoreContactsBtn); // прячем кнопку "добавить" когда 10 контактов добавлено
});

//--------------------------------- сортировка строк таблицы при нажатии на заголовок таблицы
sortColumns(tableID, tableArrowId, "id");
sortColumns(tableFIO, tableArrowFIO, "surname");
sortColumns(tableCreationDate, tableArrowCreationDate, "cratedAt");
sortColumns(tableChangeDate, tableArrowChangeDate, "updatedAt");

//--------------------------------- поиск клиента в базе
//функция задержки вывода результата
const clientFiltration = searchField.addEventListener("keyup", () => {
  setTimeout(() => {
    filteredClients();
  }, 1000);
});
