// ------------------добавление иконок контактов и тултипов----------------------

//функция возвращает css-класс контакта на основе типа контакта
export function showContactsIcons(type) {
  if (type == "Телефон") {
    return "phone";
  } else if (type == "Vk") {
    return "vk";
  } else if (type == "Email") {
    return "email";
  } else if (type == "Facebook") {
    return "facebook";
  } else if (type == "Доп. телефон") {
    return "add-phone";
  } else return;
}

//функция показа контакта
export function showTooltip() {
  const img = document.querySelectorAll(".contact-img");

  img.forEach((el) => {
    el.addEventListener("click", () => {
      el.firstChild.classList.toggle("active");
    });
  });
}
