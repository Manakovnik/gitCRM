// ------------------взаимодействие с сервером (сохранение и получение данных)----------------------

// загрузка клиентов с сервера
export async function loadClients() {
  let response = await fetch("http://localhost:3000/api/clients");
  let data = await response.json();

  if (data && data.length > 0) {
    // console.log(data);
    return data;
  } else {
    console.log("пока у Вас нет клиентов!");
    return data;
  }
}

//добаление нового клиента на сервер
export async function addClient() {
  const contacts = [];

  const select = document.querySelectorAll(".dropdown__btn");
  const input = document.querySelectorAll("#form-contacts__input");

  for (let i = 0; i < select.length; i++) {
    //проходим циклом по всем select и input на странице
    const contactsSelected = {
      type: select[i].textContent, //создаем обьект из каждого селекта и поля ввода
      value: input[i].value,
    };
    contacts.push(contactsSelected); //записываем обьект в массив
  }
  console.log(contacts);
  const response = await fetch("http://localhost:3000/api/clients", {
    //отправляем на сервер
    method: "POST",
    body: JSON.stringify({
      name: addName.value,
      surname: addSurname.value,
      lastName: addLastName.value,
      contacts: contacts,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
}

// удаление клиента с сервера
export async function deleteClient(id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: "DELETE",
  });
  if (response.status === 404) console.log("клиент не найден");
  let data = await response.json();
}

//поиск клиента на сервере
export async function getCurrentClient(id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: "GET",
  });
  if (response.status === 404) console.log("клиент не найден");
  let data = await response.json();
  return data;
}

//изменение данных клиента
export async function changeClient(id) {
  const contacts = [];
  const select = document.querySelectorAll(".dropdown__btn");
  const input = document.querySelectorAll("#form-contacts__input");

  for (let i = 0; i < select.length; i++) {
    const contactsSelected = {
      type: select[i].textContent,
      value: input[i].value,
    };
    contacts.push(contactsSelected);
  }

  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: addName.value,
      surname: addSurname.value,
      lastName: addLastName.value,
      contacts: contacts,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 404) console.log("клиент не найден");
  const data = await response.json();
}
