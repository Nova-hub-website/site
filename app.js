const play = document.getElementById("play");
const playText = [
  "Here, we provide fast and reliable services to our customers!",
  "No need to register!",
  "Just select items and speak to us directly!",
];
const menuBar = document.getElementById("menubar");
const menu = document.getElementById("menu");
const cartPage = document.querySelector(".items--container");
const linkList = document.querySelectorAll(".link");
const notificationPopup = document.querySelector(".notification");
const cart = document.getElementById("cart");
const itemsHidden = document.querySelector(".item--list--hidden");
// const logo = document.querySelector(".inactive")
const cartCloseButton = document.getElementById("cart--close--button");
const searchBar = document.getElementById("search");
const orderButton = document.getElementById("order");
const itemList = document.querySelector(".items");
const selectedItemsPage = document.querySelector(".selected--item--page");
const clearCart = document.querySelector(".clear--cart");
const searchedList = document.getElementById("searchedList");
const counterDisplay = document.querySelectorAll("#counter");
const selectPricePage = document.getElementById("selectPrice");
const el = document.getElementById("price");
const allCategories = document.getElementById("allCategories");
const categoryContainer = document.querySelector("#categories--container");
const orderFormCancel = document.getElementById("orderFormCancel");
const noAccount = document.querySelector(".noAccount");
const haveAccount = document.querySelector(".haveAccount");
const formOverLay = document.querySelector(".form--overlay");
const loginButton = document.getElementById("loginButton");

let counter = 0;
let cartList = [];
let cartListItems = [];
let prices = [];
let searchList = [];
let inCart = false;
let startingAnimation = true;

const orderProducts = document.getElementById("orderProducts");
const orderForm = document.getElementById("orderForm");

if (localStorage.getItem("customerToken")) {
  // Do something if customerToken exists
  // For example, show a welcome message or enable order features
  document.body.classList.add("logged-in");
  document.getElementById("accountName").textContent =
    localStorage.getItem("customerUsername") || "User";
} else {
  // Hide order-related elements if not logged in
  document.body.classList.remove("logged-in");
  document.getElementById("accountName").style.display = "none";
}

document.querySelector(".logoutButton").addEventListener("click", () => {
  if (confirm("Are you sure you want to log out?")) {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerUsername");
    document.body.classList.remove("logged-in");
    document.getElementById("accountName").style.display = "none";
    window.location.reload(); // Reload the page to reflect changes
  } else {
    alert("You are still logged in!");
  }
});

document.querySelector(".accountInfo").addEventListener("click", () => {
  document.querySelector(".accountInfoPage").classList.toggle("show");
});

orderButton.addEventListener("click", () => {
  if (!localStorage.getItem("customerToken")) {
    alert("You must be logged in to make a payment.");
    document.querySelector(".form--section").classList.add("show--form");
    return;
  }
  if (cartList.length === 0) {
    alert("No items have been selected!");
  } else {
    orderForm.classList.add("state");
    itemsHidden.classList.remove("item--list--show");

    for (let items = 0; items < cartList.length; items++) {
      // Find the product data using the product name from cartListItems
      let productName = cartListItems[items][0];

      // Extract quantity from cartList HTML string
      let quantity = cartListItems[items][2];

      // Get price from productData
      let price = cartListItems[items][1];
      let subtotal = price * quantity;

      orderProducts.innerHTML += `
        <li class="order--item">
          <span class="order--item--name">${productName}</span>
          <span class="order--item--price">₵${price}</span>
          <span class="order--item--quantity">${quantity}</span>
          <span class="order--item--total">₵${subtotal}</span>
        </li>`;
    }
  }
});

noAccount.addEventListener("click", () => {
  if (window.innerWidth > 640) {
    formOverLay.innerHTML = `
                    <h1>Hey there new user!</h1>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>
            <p>Create an account and let's start shopping!</p>
    `;
    formOverLay.classList.add("switchToSign");
  } else {
    document.querySelector(".form--section").classList.add("switchToOther");
  }
});

haveAccount.addEventListener("click", () => {
  if (window.innerWidth > 640) {
    formOverLay.innerHTML = `
                <h1>Welcome back User!</h1>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
            <p>Enter your credentials and start shopping again!</p>
        `;
    formOverLay.classList.remove("switchToSign");
  } else {
    document.querySelector(".form--section").classList.remove("switchToOther");
  }
});

loginButton.addEventListener("click", () => {
  document.querySelector(".form--section").classList.toggle("show--form");
});

document.querySelector(".close--form--button").addEventListener("click", () => {
  document.querySelector(".form--section").classList.remove("show--form");
});

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("messageLogin");
    message.style.color = "white";
    message.textContent = "Logging in...";
    if (!username || !password) {
      message.style.color = "red";
      message.textContent = "Fill the fields";
      return;
    }
    try {
      const res = await fetch(
        "https://site-h33e.onrender.com/api/customers/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        message.style.color = "green";
        message.textContent = "Login successful ✅";
        localStorage.setItem("customerToken", data.token);
        localStorage.setItem("customerUsername", username);
        setTimeout(() => {
          window.location.href = "index.html"; // change to your dashboard file
        }, 1000);
      } else {
        message.style.color = "red";
        message.textContent = data.message || "Login failed";
      }
    } catch (err) {
      message.textContent = "Server error";
      console.error(err);
    }
  });

document
  .getElementById("signupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById(
      "registerConfirmPassword"
    ).value;
    const email = document.getElementById("registerEmail").value.trim();
    const phone = document.getElementById("registerPhone").value.trim();
    const message = document.getElementById("messageRegister");
    message.textContent = "Registering...";
    if (password !== confirmPassword) {
      message.style.color = "red";
      message.textContent = "Passwords do not match";
      return;
    }
    if (!username || !email || !phone || !password || !confirmPassword) {
      message.style.color = "red";
      message.textContent = "Fill the fields";
      return;
    }
    try {
      const res = await fetch(
        "https://site-h33e.onrender.com/api/customers/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, phone, password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        message.style.color = "green";
        message.textContent = "Registration successful ✅";
      } else {
        message.style.color = "red";
        message.textContent = data.message || "Registration failed";
      }
    } catch (err) {
      message.textContent = "Server error";
      console.error(err);
    }
  });

orderFormCancel.addEventListener("click", () => {
  orderForm.classList.remove("state");
  orderProducts.innerHTML = "";
});

allCategories.addEventListener("click", (event) => {
  if (!categoryContainer.contains(event.target)) {
    allCategories.classList.remove("allCategories");
  }
});

const stuffs = document.querySelectorAll("category");
const productsButton = document.querySelector(".productsButton");

stuffs.forEach((element) => {
  element.addEventListener("click", () => {
    allCategories.classList.remove("allCategories");
  });
});

productsButton.addEventListener("click", () => {
  allCategories.classList.add("allCategories");
});

// play.innerHTML = playText[counter]

// let textcounter = 0;
// for (let i = 0; i < playText.length; i++) {
//     const text = playText[i];
//     setTimeout(() => {
//         console.log(text);
//     }, 1000)
// }

if (startingAnimation) {
  play.innerHTML = playText[0];
}

setInterval(() => {
  if (counter < 2) {
    startingAnimation = false;
    counter += 1;
    // console.log(counter)
    play.innerHTML = playText[counter];
  } else {
    counter = 0;
    // console.log(counter)
    play.innerHTML = playText[counter];
  }
}, 4000);

const sum = function (list) {
  let total = 0;
  if (list !== null && list.length > 0) {
    list.forEach((amount) => {
      total += Number(amount);
    });
    localStorage.setItem("prices", JSON.stringify(list));
  }

  document.querySelectorAll(".total--price").forEach((element) => {
    element.innerHTML = `Total: ₵${total.toFixed(2)}`;
  });
  return total;
};

const removeButton = [];

cart.addEventListener("click", () => {
  sum(prices);
  itemsHidden.classList.add("item--list--show");
  // removeButton = document.querySelectorAll("#removeButton")
});

if (removeButton.length >= 1) {
  for (let index = 0; index < removeButton.length; index++) {
    removeButton[index].addEventListener("click", () => {
      alert("Hi");
    });
  }
}

menuBar.addEventListener("click", () => {
  menu.classList.toggle("item-show");
  menuBar.classList.toggle("actif");
});

linkList.forEach((element) => {
  element.addEventListener("click", () => {
    menu.classList.remove("item-show");
    menuBar.classList.toggle("actif");
  });
});

document.addEventListener("click", (e) => {
  if (
    !menu.contains(e.target) &&
    !menuBar.contains(e.target) &&
    menu.classList.contains("item-show")
  ) {
    menu.classList.remove("item-show");
    menuBar.classList.toggle("actif");
  }
});

cartCloseButton.addEventListener("click", () => {
  inCart = false;
  itemsHidden.classList.remove("item--list--show");
});

const notify = (message) => {
  document.getElementById("message").innerHTML = `Added ${message}`;

  notificationPopup.classList.add("show--notification");
  setTimeout(() => {
    notificationPopup.classList.remove("show--notification");
  }, 3000);
};

const updateCart = (productData) => {
  itemList.innerHTML = "";
  itemList.innerHTML += cartList.join("");
  localStorage.setItem("cartList", JSON.stringify(cartList));
  localStorage.setItem("cartListItems", JSON.stringify(cartListItems));
  localStorage.setItem("prices", JSON.stringify(prices));
  notify(productData.ItemName);
  updateCounterDisplay();
};

const addToCartSelect = (productData, quantity, productDataPrice) => {
  const newElement = `
                      <li class="item">
                        <span class="item--info">
                            <span class="name">${productData.ItemName}</span>
                            <div>
                                <span class="price">Price: ₵${Number(
                                  productDataPrice
                                )}</span>
                                <span class="quantity">Quantity: ${quantity}</span>
                                <span class="subtotal">Subtotal: ₵${
                                  Number(productDataPrice) * quantity
                                }</span>
                            </div>
                        </span>
                        <span class="list--buttons">
                            <button class="remove--item" onclick="removeProductItem('${
                              productData.ItemName
                            }')">Remove</button>
                            <span class="change">
                                <button class="add--quantity" onclick="increaseQuantity('${
                                  productData.ItemName
                                }')">+</button>
                                <button class="subtract--quantity" onclick="decreaseQuantity('${
                                  productData.ItemName
                                }')">-</button>
                            </span>
                        </span>
                    </li>
  `;

  if (
    document
      .getElementById("selectPrice")
      .classList.contains("select--price--show")
  ) {
    document
      .getElementById("selectPrice")
      .classList.remove("select--price--show");
  }
  cartList.push(newElement);
  cartListItems.push([productData.ItemName, productDataPrice, quantity]);
  updateCart(productData);
  prices.push(Number(productDataPrice) * quantity);
  localStorage.setItem("prices", JSON.stringify(prices));
};

const increaseQuantity = (itemName) => {
  const item = cartList.find((element) => element.includes(itemName));
  const item2 = cartListItems.find((element) => element[0] === itemName);
  if (item) {
    const quantityMatch = item.match(/Quantity:\s*(\d+)/);
    const quantityMatch2 = item2 ? item2[2] : null; // Get quantity from cartListItems
    const itemPrice = item.match(/Price:\s*₵(\d+)/);

    if (quantityMatch) {
      const currentQuantity = parseInt(quantityMatch[1], 10);
      const currentQuantity2 = quantityMatch2
        ? parseInt(quantityMatch2, 10)
        : 1; // Default to 1 if not found
      const newQuantity = currentQuantity + 1;
      const newQuantity2 = currentQuantity2 + 1; // Increment the quantity from cartListItems
      const updatedItem = item.replace(
        /Quantity:\s*\d+/,
        `Quantity: ${newQuantity}`
      );
      const updatedItem2 = item2
        ? item2[0].replace(/Quantity:\s*\d+/, `Quantity: ${newQuantity2}`)
        : null; // Update quantity in cartListItems
      const index = cartList.indexOf(item);
      const index2 = cartListItems.indexOf(item2);
      cartList[index] = updatedItem;
      if (index2 !== -1 && updatedItem2) {
        cartListItems[index2] = [
          itemName,
          itemPrice ? itemPrice[1] : "0",
          newQuantity2,
        ]; // Update the cartListItems with new quantity
      }
      const updatedSubtotal =
        Number(itemPrice ? itemPrice[1] : 0) * newQuantity;
      const updatedItemWithSubtotal = updatedItem.replace(
        /Subtotal:\s*₵\d+/,
        `Subtotal: ₵${updatedSubtotal}`
      );
      cartList[index] = updatedItemWithSubtotal;
      itemList.innerHTML = cartList.join("");
      localStorage.setItem("cartList", JSON.stringify(cartList));
      localStorage.setItem("cartListItems", JSON.stringify(cartListItems));
      updateCart({ ItemName: itemName, Price: prices[index] });
      prices[index] = updatedSubtotal; // Update the price for this item
      localStorage.setItem("prices", JSON.stringify(prices));
      sum(prices);
    }
  }
};

const decreaseQuantity = (itemName) => {
  const item = cartList.find((element) => element.includes(itemName));
  const item2 = cartListItems.find((element) => element[0] === itemName);
  if (item) {
    const quantityMatch = item.match(/Quantity:\s*(\d+)/);
    const quantityMatch2 = item2 ? item2[2] : null; // Get quantity from cartListItems
    const itemPrice = item.match(/Price:\s*₵(\d+)/);

    if (quantityMatch) {
      const currentQuantity2 = quantityMatch2
        ? parseInt(quantityMatch2, 10)
        : 1; // Default to 1 if not found
      const currentQuantity = parseInt(quantityMatch[1], 10);
      if (currentQuantity <= 1) {
        return; // Prevent decreasing below 1
      }
      if (currentQuantity2 <= 1) {
        return; // Prevent decreasing below 1 in cartListItems
      }
      const newQuantity = currentQuantity - 1;
      const newQuantity2 = currentQuantity2 - 1; // Decrement the quantity from cartListItems
      const updatedItem = item.replace(
        /Quantity:\s*\d+/,
        `Quantity: ${newQuantity}`
      );
      const updatedItem2 = item2
        ? item2[0].replace(/Quantity:\s*\d+/, `Quantity: ${newQuantity2}`)
        : null; // Update quantity in cartListItems
      const index = cartList.indexOf(item);
      const index2 = cartListItems.indexOf(item2);
      cartList[index] = updatedItem;
      if (index2 !== -1 && updatedItem2) {
        cartListItems[index2] = [
          itemName,
          itemPrice ? itemPrice[1] : "0",
          newQuantity2,
        ]; // Update the cartListItems with new quantity
      }
      const updatedSubtotal =
        Number(itemPrice ? itemPrice[1] : 0) * newQuantity;
      const updatedItemWithSubtotal = updatedItem.replace(
        /Subtotal:\s*₵\d+/,
        `Subtotal: ₵${updatedSubtotal}`
      );
      cartList[index] = updatedItemWithSubtotal;
      itemList.innerHTML = cartList.join("");
      localStorage.setItem("cartList", JSON.stringify(cartList));
      localStorage.setItem("cartListItems", JSON.stringify(cartListItems));
      updateCart({ ItemName: itemName, Price: prices[index] });
      prices[index] = updatedSubtotal; // Update the price for this item
      localStorage.setItem("prices", JSON.stringify(prices));
      sum(prices);
    }
  }
};

const addToCart = (productData, quantity) => {
  quantity = Number(quantity); // Default to 1 if quantity is not provided
  if (
    String(productData.Price).split("").length > 3 &&
    productData.Price.split("").length > 4
  ) {
    openSelectPrice(productData, quantity);
    if (selectedItemsPage.classList.contains("selected--item--page--show")) {
      selectedItemsPage.classList.remove("selected--item--page--show");
    }
  } else {
    const existingIndex = cartList.findIndex((item) =>
      item.includes(productData.ItemName)
    );
    if (existingIndex !== -1) {
      // If item already exists in cart, increase its quantity
      const item = cartList[existingIndex];
      const quantityMatch = item.match(/Quantity:\s*(\d+)/);
      let currentQuantity = quantityMatch ? parseInt(quantityMatch[1], 10) : 1;
      currentQuantity += quantity;
      const updatedItem = item
        .replace(/Quantity:\s*\d+/, `Quantity: ${currentQuantity}`)
        .replace(
          /Subtotal:\s*₵\d+/,
          `Subtotal: ₵${Number(productData.Price) * currentQuantity}`
        );
      cartList[existingIndex] = updatedItem;
      prices[existingIndex] = Number(productData.Price) * currentQuantity;
      localStorage.setItem("cartListItems", JSON.stringify(cartListItems));
      localStorage.setItem("prices", JSON.stringify(prices));
      itemList.innerHTML = cartList.join("");
      localStorage.setItem("cartList", JSON.stringify(cartList));
      updateCart(productData);
      sum(prices);
      updateCounterDisplay();
      if (selectedItemsPage.classList.contains("selected--item--page--show")) {
        selectedItemsPage.classList.remove("selected--item--page--show");
      }
      return;
    }
    const newElement = `
                    <li class="item">
                        <span class="item--info">
                            <span class="name">${productData.ItemName}</span>
                            <div>
                                <span class="price">Price: ₵${Number(
                                  productData.Price
                                )}</span>
                                <span class="quantity">Quantity: ${quantity}</span>
                                <span class="subtotal">Subtotal: ₵${
                                  Number(productData.Price) * quantity
                                }</span>
                            </div>
                        </span>
                        <span class="list--buttons">
                            <button class="remove--item" onclick="removeProductItem('${
                              productData.ItemName
                            }')">Remove</button>
                            <span class="change">
                                <button class="add--quantity" onclick="increaseQuantity('${
                                  productData.ItemName
                                }')">+</button>
                                <button class="subtract--quantity" onclick="decreaseQuantity('${
                                  productData.ItemName
                                }')">-</button>
                            </span>
                        </span>
                    </li>
      `;

    if (selectedItemsPage.classList.contains("selected--item--page--show")) {
      selectedItemsPage.classList.remove("selected--item--page--show");
    }
    cartList.push(newElement);
    cartListItems.push([productData.ItemName, productData.Price, quantity]);
    updateCart(productData);
    prices.push(Number(productData.Price) * quantity);
    localStorage.setItem("prices", JSON.stringify(prices));
  }
};

clearCart.addEventListener("click", () => {
  cartList = [];
  cartListItems = [];
  prices = [];
  localStorage.setItem("cartList", JSON.stringify(cartList));
  localStorage.setItem("cartListItems", JSON.stringify(cartListItems));
  localStorage.setItem("prices", JSON.stringify(prices));
  itemList.innerHTML = `
                    <li class="empty--message">Cart is Empty</li>

    `;
  updateCounterDisplay();
  sum(prices);
});

const removeProductItem = (itemName) => {
  if (confirm("Are you sure you want to remove this item from the cart?")) {
    const itemIndex = cartList.findIndex((item) => item.includes(itemName));
    if (itemIndex !== -1) {
      cartList.splice(itemIndex, 1);
      cartListItems.splice(itemIndex, 1); // Remove the corresponding item name
      prices.splice(itemIndex, 1); // Remove the corresponding price
      localStorage.setItem("cartList", JSON.stringify(cartList));
      localStorage.setItem("cartListItems", JSON.stringify(cartListItems));
      localStorage.setItem("prices", JSON.stringify(prices));
      itemList.innerHTML = cartList.join("");
      updateCounterDisplay();
      sum(prices);
      if (cartList.length === 0) {
        itemList.innerHTML = `
                  <li class="empty--message">Cart is Empty</li>
              `;
      }
    }
  }
};

const updateCounterDisplay = () => {
  let numberOfItems = itemList.getElementsByClassName("item").length;
  if (numberOfItems > 0) {
    counterDisplay.forEach((counter) => {
      counter.style.background = "red";
      counter.textContent = numberOfItems;
    });
  } else {
    counterDisplay.forEach((counter) => {
      counter.style.background = "#1F201F";
      counter.textContent = "0";
    });
  }
};

window.addEventListener("load", () => {
  let storedCartList = localStorage.getItem("cartList");
  let storedCartListItems = localStorage.getItem("cartListItems");
  let storedPrices = localStorage.getItem("prices");
  if (storedCartList) {
    cartList = JSON.parse(storedCartList);
    cartListItems = JSON.parse(storedCartListItems);
    prices = JSON.parse(storedPrices);

    if (cartList.length > 0) {
      itemList.innerHTML = cartList.join("");
    }
    updateCounterDisplay();
  }
});

async function fetchProducts() {
  try {
    const res = await fetch("https://site-h33e.onrender.com/api/products/all");
    const products = await res.json();
    return products;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

let data = [];
let yourData = { data: data };
let productList = [];
async function loadProducts() {
  const products = await fetchProducts();
  yourData.data = products;
  initializeProducts();
  sum(prices);

  productList = document.querySelectorAll(".product");

  for (let i = 0; i < productList.length; i++) {
    productList[i]
      .getElementsByTagName("img")[0]
      .addEventListener("click", () => {
        selectItem(productList[i]);
      });
  }

  for (let i = 0; i < productList.length; i++) {
    productList[i]
      .getElementsByClassName("add--area")[0]
      .addEventListener("click", () => {
        selectItem(productList[i]);
      });
  }

  // Optional: expose to window
  window.allProducts = yourData.data;
}

loadProducts();

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function initializeProducts() {
  for (let product = 0; product < yourData.data.length; product++) {
    let productData = yourData.data[product];
    if (capitalizeWords(productData.ItemCategory) === "Foreign Sim Cards") {
      let newItem = document.createElement("li");
      newItem.innerHTML = `<div class="product">
                                        <div id="content">
                                            <img src="${
                                              productData.ImageURL
                                            }" alt="${
        productData.ItemName.split(" ")[0]
      } flag">
                                            <div class="control">
                                                <span class="item--name">${
                                                  productData.ItemName
                                                }</span>
                                                <p class="item--price">₵${
                                                  productData.Price
                                                }</p>
                                                <p class="${
                                                  productData.InStock
                                                    ? "in--stock"
                                                    : "out--stock"
                                                }">${productData.Status}</p>
                                                <span tabindex="0" class="add--area"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>Add to Cart</span>
                                            </div>
                                        </div>
        
                                    </div>`;
      document.querySelector(".products").appendChild(newItem);
    } else if (capitalizeWords(productData.ItemCategory) === "Gift Cards") {
      let newItem = document.createElement("li");
      newItem.innerHTML = `<div class="product">
                                        <div id="content">
                                            <img src="${
                                              productData.ImageURL
                                            }" alt="${
        productData.ItemName.split(" ")[0]
      } flag">
                                            <div class="control">
                                                <span class="item--name">${
                                                  productData.ItemName
                                                }</span>
                                                <p class="item--price">₵${
                                                  productData.Price
                                                }</p>
                                                <p class="${
                                                  productData.InStock
                                                    ? "in-stock"
                                                    : "out-stock"
                                                }}">${productData.Status}</p>
                                                <span tabindex="0" class="add--area"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>Add to Cart</span>
                                            </div>
                                        </div>
        
                                    </div>`;
      document.querySelector(".products--giftcards").appendChild(newItem);
    } else if (
      capitalizeWords(productData.ItemCategory) === "Telco Pre-paid Cards"
    ) {
      let newItem = document.createElement("li");
      newItem.innerHTML = `<div class="product">
                                        <div id="content">
                                            <img src="${
                                              productData.ImageURL
                                            }" alt="${
        productData.ItemName.split(" ")[0]
      } flag">
                                            <div class="control">
                                                <span class="item--name">${
                                                  productData.ItemName
                                                }</span>
                                                <p class="item--price">₵${
                                                  productData.Price
                                                }</p>
                                                <p class="${
                                                  productData.InStock
                                                    ? "in-stock"
                                                    : "out-stock"
                                                }}">${productData.Status}</p>
                                                <span tabindex="0" class="add--area"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>Add to Cart</span>
                                            </div>
                                        </div>
        
                                    </div>`;
      document.querySelector(".products--telco").appendChild(newItem);
    } else if (capitalizeWords(productData.ItemCategory) === "Subscriptions") {
      let newItem = document.createElement("li");
      newItem.innerHTML = `<div class="product">
                                        <div id="content">
                                            <img src="${
                                              productData.ImageURL
                                            }" alt="${
        productData.ItemName.split(" ")[0]
      } flag">
                                            <div class="control">
                                                <span class="item--name">${
                                                  productData.ItemName
                                                }</span>
                                                <p class="item--price">₵${
                                                  productData.Price
                                                }</p>
                                                <p class="${
                                                  productData.InStock
                                                    ? "in-stock"
                                                    : "out-stock"
                                                }}">${productData.Status}</p>
                                                <span tabindex="0" class="add--area"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>Add to Cart</span>
                                            </div>
                                        </div>
        
                                    </div>`;
      document.querySelector(".products--subscriptions").appendChild(newItem);
    } else if (
      capitalizeWords(productData.ItemCategory) === "Virtual Credit Cards"
    ) {
      let newItem = document.createElement("li");
      newItem.innerHTML = `<div class="product">
                                        <div id="content">
                                            <img src="${
                                              productData.ImageURL
                                            }" alt="${
        productData.ItemName.split(" ")[0]
      } flag">
                                            <div class="control">
                                                <span class="item--name">${
                                                  productData.ItemName
                                                }</span>
                                                <p class="item--price">₵${
                                                  productData.Price
                                                }</p>
                                                <p class="${
                                                  productData.InStock
                                                    ? "in-stock"
                                                    : "out-stock"
                                                }}">${productData.Status}</p>
                                                <span tabindex="0" class="add--area"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>Add to Cart</span>
                                            </div>
                                        </div>
        
                                    </div>`;
      document.querySelector(".products--virtual").appendChild(newItem);
    } else if (capitalizeWords(productData.ItemCategory) === "Payment Cards") {
      let newItem = document.createElement("li");
      newItem.innerHTML = `<div class="product">
                                        <div id="content">
                                            <img src="${
                                              productData.ImageURL
                                            }" alt="${
        productData.ItemName.split(" ")[0]
      } flag">
                                            <div class="control">
                                                <span class="item--name">${
                                                  productData.ItemName
                                                }</span>
                                                <p class="item--price">₵${
                                                  productData.Price
                                                }</p>
                                                <p class="${
                                                  productData.InStock
                                                    ? "in-stock"
                                                    : "out-stock"
                                                }}">${productData.Status}</p>
                                                <span tabindex="0" class="add--area"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>Add to Cart</span>
                                            </div>
                                        </div>
        
                                    </div>`;
      document.querySelector(".products--payment").appendChild(newItem);
    }
  }
}

const pricesList = ["160", "260", "360", "1600"];

let firstClick = 0;
const updatePrice = function (product, quantity, number) {
  const addPricee = document.getElementById("addPrice");
  addPricee.addEventListener("click", () => {
    addToCartSelect(product, quantity, pricesList[number]);
  });
};

const openSelectPrice = (product, quantity) => {
  selectPricePage.innerHTML = `
 <div class="select--price--container">
            <div class="content">
                <h1>--Select Price--</h1>
                <div class="sp--item--name">
                    <h2>${product.ItemName}</h2>
                </div>
                <div id="price">
                    <button class="priceBtn" onclick='updatePrice(${yourData.data}, ${quantity}, 0)'>160</button>
                    <button class="priceBtn" onclick='updatePrice(${yourData.data}, ${quantity}, 1)'>260</button>
                    <button class="priceBtn" onclick='updatePrice(${yourData.data}, ${quantity}, 2)'>360</button>
                    <button class="priceBtn" onclick='updatePrice(${yourData.data}, ${quantity}, 3)'>1600</button>
                </div>
                <div class="buttons">
                    <button id="optionsSelectCancelButton">Cancel</button>
                    <button id="addPrice">Add to Cart</button>

                </div>
            </div>
        </div>
`;
  selectPricePage.classList.add("select--price--show");
  const optionsSelectCancelButton = document.getElementById(
    "optionsSelectCancelButton"
  );

  optionsSelectCancelButton.addEventListener("click", () => {
    selectPricePage.classList.remove("select--price--show");
  });
};

for (let j = 0; j < searchedList.length; j++) {
  searchedList[j].addEventListener("click", () => {
    let productData = yourData.data.find(
      (item) => item.ItemName === searchedList[j].textContent
    );

    selectedItemsPage.getElementsByClassName("texts")[0].innerHTML = `
            <img src="${productData.ImageURL}" alt="${
      productData.ItemName.split(" ")[0]
    } flag" id="selected--item--image">
            <h1 class="selected--item--name">
            ${searchedList[j].textContent}
            </h1>
            <span class="selected--item--price">
            Price: ${productData.Price}
            </span>
            <span class="selected--item--quantity">
            Quantity: ${productData.Stock}
            </span>
        `;
    selectedItemsPage.getElementsByClassName(
      "selected--items--buttons"
    )[0].innerHTML = `
            <button class="cancel--selection" onclick='hideSelection()' id="selected--close--button">Cancel</button>
            <button class="add--selection" onclick='addToCart(${yourData.data})'>Add to Cart</button>
        `;
    selectedItemsPage.classList.add("selected--item--page--show");
  });
}

const hideSelection = () => {
  selectedItemsPage.classList.remove("selected--item--page--show");
};

let quantity = 0;

const selectItem = (productElement) => {
  let productData = yourData.data.find(
    (item) =>
      item.ItemName === productElement.querySelector(".item--name").textContent
  );
  selectedItemsPage.getElementsByClassName("texts")[0].innerHTML = `
        <img src="${productData.ImageURL}" alt="${
    productData.ItemName.split(" ")[0]
  } flag" id="selected--item--image">
        <h1 class="selected--item--name">
        ${productElement.querySelector(".item--name").textContent}
        </h1>
        <span class="selected--item--price">
        Price: ${productElement.querySelector(".item--price").textContent}
        </span>
        <span class="selected--item--quantity">
        Quantity: ${productData.Stock}
        </span>
    `;

  selectedItemsPage.getElementsByClassName("quantitySelect")[0].innerHTML = `
    <span>Quantity: </span>
                  <input type="number" value="1" name="quantityNumber" id="quantityNumber" title="Quantity" min="1">
    `;
  document.getElementById("quantityNumber").addEventListener("change", () => {
    quantity = this.value;
  });

  selectedItemsPage.getElementsByClassName(
    "selected--items--buttons"
  )[0].innerHTML = `
      <button class="cancel--selection" onclick='hideSelection()' id="selected--close--button">Cancel</button>
      <button class="add--selection" onclick='addToCart(${JSON.stringify(
        productData
      )}, document.getElementById("quantityNumber").value)'>Add to Cart</button>
    `;
  selectedItemsPage.classList.add("selected--item--page--show");
};

for (let j = 0; j < searchedList.length; j++) {
  searchedList[j].addEventListener("click", () => {
    let productData = yourData.data.find(
      (item) => item.ItemName === searchedList[j].textContent
    );

    selectedItemsPage.getElementsByClassName("texts")[0].innerHTML = `
            <img src=".${productData.ImageURL}" alt="${
      productData.ItemName.split(" ")[0]
    } flag" id="selected--item--image">
            <h1 class="selected--item--name">
            ${searchedList[j].textContent}
            </h1>
            <span class="selected--item--price">
            Price: ${productData.Price}
            </span>
            <span class="selected--item--quantity">
            Quantity: ${productData.Stock}
            </span>
        `;
    selectedItemsPage.getElementsByClassName(
      "selected--items--buttons"
    )[0].innerHTML = `
            <button class="cancel--selection" onclick='hideSelection()' id="selected--close--button">Cancel</button>
            <button class="add--selection" onclick='addToCart(${yourData.data})'>Add to Cart</button>
        `;
    selectedItemsPage.classList.add("selected--item--page--show");
  });
}

let numberOfItems = itemList.getElementsByTagName("li").length;
if (numberOfItems > 0) {
  counterDisplay.forEach((counter) => {
    counter.style.background = "red";
    counter.textContent = numberOfItems;
  });
} else {
  counterDisplay.forEach((counter) => {
    counter.style.background = "#1F201F";
    counter.textContent = "0";
  });
}

searchBar.addEventListener("keyup", () => {
  if (searchBar.value === "" || searchBar.value === " ") {
    searchedList.style.display = "none";
    searchedList.innerHTML = "";
  } else {
    let searchValue = searchBar.value.toLowerCase();
    searchedList.innerHTML = "";
    let found = false;
    for (let i = 0; i < yourData.data.length; i++) {
      let productName = yourData.data[i].ItemName.toLowerCase();
      if (productName.includes(searchValue)) {
        found = true;
        let listItem = document.createElement("li");
        listItem.className = "searched--item";
        let itemName = document.createElement("span");
        itemName.className = "item--name";
        itemName.textContent = yourData.data[i].ItemName;
        let itemPrice = document.createElement("span");
        itemPrice.className = "item--price";
        itemPrice.textContent = `₵${yourData.data[i].Price}`;
        listItem.appendChild(itemName);
        listItem.appendChild(itemPrice);
        listItem.addEventListener("click", () => {
          searchBar.value = itemName.textContent;
          searchedList.style.display = "none";
          selectItem(listItem);
        });
        searchedList.appendChild(listItem);
      }
    }
    searchedList.style.display = found ? "flex" : "none";
  }
});

async function fetchCustomers() {
  try {
    const res = await fetch("https://site-h33e.onrender.com/api/customers/all");
    const customers = await res.json();
    return customers;
  } catch (err) {
    console.error("Failed to fetch customers:", err);
    return [];
  }
}

async function getCustomerIdByName(name) {
  const customer = await fetchCustomers(); // Fetch all from DB
  const trimmedName = name.trim().toLowerCase();

  const found = customer.find(
    (p) => p.username.trim().toLowerCase() === trimmedName
  );
  console.log("Looking for:", trimmedName);
  customer.forEach((p) => console.log("→", p.username.toLowerCase()));

  if (found) {
    console.log("✅ Found ID:", found._id);
    alert(`Customer ID found: ${found._id}`);
    return found._id;
  } else {
    console.warn("❌ Customer not found with name:", name);
    return null;
  }
}

const paymentForm = document.getElementById("orderForm");
paymentForm.addEventListener("submit", payWithPaystack, false);
function payWithPaystack(e) {
  e.preventDefault();
  let handler = PaystackPop.setup({
    key: "pk_test_657f89eccc84305c6401312fcd2608fd1676c97c", // Replace with your public key
    email: document.getElementById("email-address").value,
    amount: sum(prices) * 100,
    currency: "GHS",
    ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function () {
      alert("Window closed.");
    },
    callback: function (response) {
      let message = "✅ Payment complete! Reference: " + response.reference;
      console.log("🧾 Name:", document.getElementById("name").value);
      console.log("📧 Email:", document.getElementById("email-address").value);
      console.log("💵 Total Price:", sum(prices));

      alert(message);
      const arrayOfProducts = cartListItems.map((item) => item[0]);
      const arrayOfQuantity = cartListItems.map((item) => item[1]);
      const arrayOfPrices = cartListItems.map((item) => item[2]);
      const orderData = {
        userName: document.getElementById("name").value, // Name of the user who placed the order
        userEmail: document.getElementById("email-address").value, // Email of the user who placed the order
        productsNames: arrayOfProducts,
        quantity: arrayOfQuantity, // Quantity of the product ordered
        price: arrayOfPrices, // Price per unit of the product
        totalPrice: sum(prices),
        reference: response.reference,
      };

      // Send order data to backend
      const c = getCustomerIdByName(localStorage.getItem("customerUsername"))
      fetch(
        `https://site-h33e.onrender.com/api/customers/add-order/${c}
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      )
        .then(async (res) => {
          const data = await res.json();

          if (!res.ok) {
            console.error("❌ Order validation error:", data);
            alert("❌ Error saving order:\n" + (data.error || data.message));
            return;
          }

          console.log("✅ Order saved to customer orders:", data);
          alert("🧾 Order recorded successfully!");
        })
        .catch((err) => {
          console.error("❌ Failed to save order:", err);
          alert("❌ Order not recorded, but payment was successful.");
        });
    },
  });

  handler.openIframe();
}
