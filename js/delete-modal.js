//---------------------------модальное окно подтверждения удаления--------------
import { createTable, allClients, clientId } from "./index.js";
import { loadClients, deleteClient } from "./local-host.js";
import { closeWindow } from "./modal-window.js";

// создаем модальное окно подтверждения удаления
export const modalDeleteWindowWrapper = document.createElement("div");
export const modalDeleteWindow = document.createElement("div");
export const title = document.createElement("h2");
export const text = document.createElement("p");
export const deleteButton = document.createElement("button");
export const cancelButton = document.createElement("button");
export const closeButton = document.createElement("button");

modalDeleteWindowWrapper.classList.add("change-data");
modalDeleteWindow.classList.add("change-data__window", "modal-window");

title.textContent = "Удалить клиента";
title.classList.add("modal-window__title");

text.textContent = "Вы действительно хотите удалить данного клиента?";
text.classList.add("modal-window__text");

deleteButton.textContent = "Удалить";
deleteButton.classList.add("save-btn");

cancelButton.textContent = "Отмена";
cancelButton.classList.add("delete-btn");

closeButton.classList.add("change-data__close--btn");
export const contactsForm = document.querySelector(".form-contacts__wrapper");
modalDeleteWindow.appendChild(title);
modalDeleteWindow.appendChild(closeButton);
modalDeleteWindow.appendChild(text);
modalDeleteWindow.appendChild(deleteButton);
modalDeleteWindow.appendChild(cancelButton);
modalDeleteWindowWrapper.appendChild(modalDeleteWindow);
document.body.appendChild(modalDeleteWindowWrapper);

// функция подтверждения удаления
export async function deleteClientConfirm() {
  let id = clientId;
  modalDeleteWindowWrapper.style.display = "block";
  closeButton.addEventListener("click", () => {
    modalDeleteWindowWrapper.style.display = "none";
  });

  deleteButton.addEventListener("click", async () => {
    await deleteClient(id); //  удаляем клиента по id
    modalDeleteWindowWrapper.style.display = "none";

    createTable(await loadClients(allClients)); // перерисовываем таблицу после удаления

    closeWindow(); //закрываем мдальное окно

    location.reload(); //перезагружаем страницу
  });

  // кнопка отмены
  cancelButton.addEventListener("click", () => {
    modalDeleteWindowWrapper.style.display = "none";
    return;
  });
}
