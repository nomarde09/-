// Этап 3: добавление записи в список на странице.
// Записи хранятся только в памяти — после перезагрузки страницы список пустеет.
// Сохранение в localStorage будет на этапе 4.

const form = document.getElementById("add-form");
const titleInput = document.getElementById("title-input");
const typeSelect = document.getElementById("type-select");
const itemList = document.getElementById("item-list");
const emptyMessage = document.getElementById("empty-message");

const TYPE_LABELS = {
  movie: "Фильм",
  series: "Сериал",
};

// Все записи. Формат одной записи описан в PROJECT.md.
const items = [];

// Перерисовывает список на странице по массиву items.
function renderList() {
  itemList.innerHTML = "";

  for (const item of items) {
    const li = document.createElement("li");
    // textContent, а не innerHTML: название вводит пользователь, и HTML в нём не должен выполняться.
    li.textContent = item.title + " — " + TYPE_LABELS[item.type];
    itemList.appendChild(li);
  }

  emptyMessage.hidden = items.length > 0;
}

form.addEventListener("submit", function (event) {
  // Не даём браузеру перезагрузить страницу.
  event.preventDefault();

  const title = titleInput.value.trim();
  if (title === "") {
    return;
  }

  items.push({
    id: Date.now(),
    title: title,
    type: typeSelect.value,
    status: "want",
  });

  renderList();

  form.reset();
  titleInput.focus();
});

renderList();
