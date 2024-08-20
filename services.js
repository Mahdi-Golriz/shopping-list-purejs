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

let cache = {};

function preloadCache() {
  const preCache = localStorage.getItem("cache");
  if (!preCache) return;
  const parsedCache = JSON.parse(preCache);
  cache = parsedCache;
}
preloadCache();

export async function getSpecificCategory(category) {
  const cachedTime = +localStorage.getItem("cachedTime");
  const checkTime = Date.now() - cachedTime < 30 * 1000;

  if (category in cache && checkTime) return cache[category];

  try {
    document.querySelector(".loader--container").style.display = "block";
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    if (!res.ok) throw Error();

    specificCategory = await res.json();

    cache[category] = specificCategory;

    localStorage.setItem("cache", JSON.stringify(cache));
    localStorage.setItem("cachedTime", JSON.stringify(Date.now()));
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
