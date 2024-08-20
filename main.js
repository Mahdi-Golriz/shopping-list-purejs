import getData, {
  getAllCategories,
  getSortedData,
  getSpecificCategory,
} from "./services.js";
const data = await getData();

let activeIndex = 0;
const categories = await getAllCategories();
const filterButtons = document.querySelectorAll("div.filter button");
const sortButtons = document.querySelectorAll("div.sort button");

async function _handleFilterItems() {
  filterButtons.forEach((button, i) => {
    button.addEventListener("click", async () => {
      if (button.classList.contains("active")) return;
      activeIndex = i;
      document.querySelector(".ascending").classList.add("active");
      _updateIndex();

      if (i === 0) {
        document.querySelector("main ul").innerHTML = "";
        _generateProductCards(data);
      } else {
        sortButtons.forEach(
          (button) =>
            button.classList.contains("active") &&
            button.classList.remove("active")
        );

        button.innerHTML = categories[i - 1];

        let filteredData = await getSpecificCategory(categories[i - 1]);

        document.querySelector("main ul").innerHTML = "";

        _generateProductCards(filteredData);
      }
    });
  });
}

function _numItems(length) {
  document.querySelector(".numItems").innerHTML = `${length} Items`;
}

async function _handleSortItems() {
  const ascendingButton = document.querySelector(".ascending");
  const descendingButton = document.querySelector(".descending");

  ascendingButton.addEventListener("click", async () => {
    if (ascendingButton.classList.contains("active")) return;

    descendingButton.classList.remove("active");
    ascendingButton.classList.add("active");

    const ascendedItems = await getSortedData("asc");
    document.querySelector("main ul").innerHTML = "";
    _generateProductCards(ascendedItems);
  });

  descendingButton.addEventListener("click", async () => {
    if (descendingButton.classList.contains("active")) return;

    ascendingButton.classList.remove("active");
    descendingButton.classList.add("active");
    const descendedItems = await getSortedData("desc");
    document.querySelector("main ul").innerHTML = "";
    _generateProductCards(descendedItems);
  });
}

function _updateIndex() {
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.toggle("active", i === activeIndex);
  }
}

function _generateProductCards(selectedData = data) {
  selectedData.forEach((item) => {
    let img = document.createElement("img");
    img.setAttribute("src", item.image);

    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = item.title;

    let figure = document.createElement("figure");
    figure.append(img, figcaption);

    let rate = document.createElement("p");
    rate.setAttribute("class", "rate");
    rate.innerHTML = `${item.rating.rate} ⭐ ${item.rating.count} ratinngs`;

    let price = document.createElement("p");
    price.setAttribute("class", "price");
    price.innerHTML = `${item.price} $`;

    let description = document.createElement("p");
    description.setAttribute("class", "description");
    description.innerHTML = item.description;

    let div = document.createElement("div");
    div.append(figure, rate, price, description);

    let anchor = document.createElement("a");
    anchor.setAttribute("href", "#");
    anchor.append(div);

    let li = document.createElement("li");
    li.append(anchor);

    document.querySelector("main ul").append(li);
  });

  _numItems(selectedData.length);
}

_generateProductCards();
_handleFilterItems();
_handleSortItems();
