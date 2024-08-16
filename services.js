let data;
let specificCategory;
let sortedData;
export default async function getData() {
  try {
    document.querySelector(".loader--container").style.display = "block";
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw Error();
    data = await res.json();
  } catch {
    throw Error("Failed fetching data");
  } finally {
    document.querySelector(".loader--container").style.display = "none";
  }

  return data;
}

export async function getSpecificCategory(category) {
  try {
    document.querySelector(".loader--container").style.display = "block";
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    if (!res.ok) throw Error();

    specificCategory = await res.json();
  } catch {
    throw Error("Failed fetching data");
  } finally {
    document.querySelector(".loader--container").style.display = "none";
  }
  return specificCategory;
}

export async function getSortedData(sort) {
  try {
    document.querySelector(".loader--container").style.display = "block";
    const res = await fetch(`https://fakestoreapi.com/products?sort=${sort}`);
    if (!res.ok) throw Error();
    sortedData = await res.json();
  } catch {
    throw Error("Failed fetching data");
  } finally {
    document.querySelector(".loader--container").style.display = "none";
  }
  return sortedData;
}

export async function getAllCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();
  return categories;
}
