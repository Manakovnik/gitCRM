// ------------------модальное окно----------------------

//открытие-закрытие окна для добавления или изменения клиента
import {
  clientAddTableBtn,
  addName,
  addSurname,
  addLastName,
} from "./index.js";

export const closeClientWindow = document.getElementById("closeClientWindow");

//открытие окна
export function openWindow() {
  let addClientWindow = document.getElementById("addClientWindow");
  addClientWindow.style.display = "block";
  addName.value = "";
  addSurname.value = "";
  addLastName.value = "";
}

// закрытие окна
export function closeWindow() {
  let addClientWindow = document.getElementById("addClientWindow");
  addClientWindow.style.display = "none";
  addName.value = "";
  addSurname.value = "";
  addLastName.value = "";
}
