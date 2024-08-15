import getData from "./services.js";
let data = await getData();

console.log(data[0]);

function _ShoppingList() {
  data.forEach((item) => {
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
    price.innerHTML = item.price;

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
}

_ShoppingList();
