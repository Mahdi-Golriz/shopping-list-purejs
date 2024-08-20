import getData, {
  getAllCategories,
  getSortedData,
  getSpecificCategory,
} from "./services.js";
const data = await getData();

// using activeIndex to hanlde filter buttons' css and eventhandler
let activeIndex = 0;
const categories = await getAllCategories();
const filterButtons = document.querySelectorAll("div.filter button");
const sortButtons = document.querySelectorAll("div.sort button");
const container = document.querySelector("main ul");

async function _handleFilterItems() {
  filterButtons.forEach((button, i) => {
    button.addEventListener("click", async () => {
      if (button.classList.contains("active")) return;

      activeIndex = i;

      // toggle active class based on activeIndex
      _updateIndex();

      // first button is used to display all items (data)
      if (i === 0) {
        // sort buttons are applicable for all items not categories
        _enableSortButtons();

        // generate list of product cards for all items
        _generateProductCards(data);
      } else {
        // sort buttons should be inactive for categories
        _disableSortButtons();

        // fetch data for each specific category based
        let filteredData = await getSpecificCategory(categories[i - 1]);
        _generateProductCards(filteredData);
      }
    });
  });
}

// removing active class, adding disabled
function _disableSortButtons() {
  sortButtons.forEach((button) => {
    button.classList?.remove("active");
    button.setAttribute("disabled", "");
    button.style.cursor = "not-allowed";
  });
}

// adding active class, removing disabled
function _enableSortButtons() {
  sortButtons.forEach((button, i) => {
    button.removeAttribute("disabled");
    // Items (data) are ascending by default
    button.classList.toggle("active", i === 0);
    button.style.cursor = "pointer";
  });
}

// calculate number of Items to display
function _numItems(length) {
  document.querySelector(".numItems").innerHTML = `${length} Items`;
}

async function _handleSortItems() {
  sortButtons.forEach((button, i) => {
    button.addEventListener("click", async () => {
      if (button.classList.contains("active")) return;

      if (i === 0) {
        button.classList.add("active");
        sortButtons[1].classList.remove("active");
      }

      if (i === 1) {
        button.classList.add("active");
        sortButtons[0].classList.remove("active");
      }

      let sortedItems = await getSortedData(i === 0 ? "asc" : "desc");
      _generateProductCards(sortedItems);
    });
  });
}

// toggle active class
function _updateIndex() {
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.toggle("active", i === activeIndex);
  }
}

// create the cards of products based on received data
function _generateProductCards(selectedData = data) {
  container.innerHTML = "";
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

    container.append(li);
  });

  _numItems(selectedData.length);
}

_generateProductCards();
_handleFilterItems();
_handleSortItems();
