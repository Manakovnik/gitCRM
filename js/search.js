// ------------------поиск клиента----------------------

import { allClients, createTable, searchField } from "./index.js";

//функция поиска клиента в базе клиентов по символам вводимым в инпут.
export function filteredClients() {
  let filteredArrey = allClients.filter((client) => {
    if (searchField.value) {
      const clientSurName = client.surname.toLowerCase();
      const clientName = client.name.toLowerCase();
      const clientLastName = client.lastName.toLowerCase();
      let clientContact;
      const filterValue = searchField.value.toLowerCase();

      for (let i = 0; i < client.contacts.length; i++) {
        clientContact = client.contacts[i].value; //берем данные контактов для поиска по ним
      }

      return (
        clientSurName.includes(filterValue) ||
        clientName.includes(filterValue) ||
        clientLastName.includes(filterValue) ||
        clientContact.includes(filterValue)
      );
    }

    return true;
  });

  return createTable(filteredArrey);
}
