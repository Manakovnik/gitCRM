// ------------------сортировка клиентов----------------------

import { allClients, createTable, clientId } from "./index.js";

//функция сортировки
export function sortedRows(method, direction) {
  const copyClient = [...allClients];

  if (direction === "up") {
    copyClient.sort((a, b) => {
      if (a[method] < b[method]) {
        return -1;
      }

      if (a[method] > b[method]) {
        return 1;
      }

      return 0;
    });
  } else {
    copyClient.sort((a, b) => {
      if (a[method] > b[method]) {
        return -1;
      }

      if (a[method] < b[method]) {
        return 1;
      }

      return 0;
    });
  }
  return copyClient;
}

// сортировка при нажатии на заголовок таблицы, изменение направления стрелок
export function sortColumns(clickTarget, arrowTarget, method) {
  clickTarget.addEventListener("click", function () {
    if (!arrowTarget.classList.contains("table__svg--arrow-down")) {
      arrowTarget.classList.add("table__svg--arrow-down");
      arrowTarget.setAttribute("direction", "down");
    } else {
      arrowTarget.classList.remove("table__svg--arrow-down");
      arrowTarget.setAttribute("direction", "up");
    }

    const direction = arrowTarget.getAttribute("direction");
    const rows = sortedRows(`${method}`, direction);

    createTable(rows);
  });
}
