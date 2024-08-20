// keep all products' data
let data;

// kepp products of each category
let specificCategory;

// kepp sorted products
let sortedData;

// get all products
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

// an object to cache the products of each cagetory after first fetching
let cache = {};

// preload the cache from local storage
function preloadCache() {
  const preCache = localStorage.getItem("cache");
  if (!preCache) return;
  const parsedCache = JSON.parse(preCache);
  cache = parsedCache;
}
preloadCache();

export async function getSpecificCategory(category) {
  // get the chached time to campare with current time
  const cachedTime = +localStorage.getItem("cachedTime");

  const checkTime = Date.now() - cachedTime < 30 * 1000;

  // get the data from cache after first fetching and update the cache after 30 seconds
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
