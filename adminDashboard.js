// ✅ Auto-redirect if already logged in
const token = sessionStorage.getItem("adminToken");
let currentlyEditingProductName = "";
if (!token) {
  alert("Access denied. Please log in first.");
  window.location.href = "admin.html"; // or your actual dashboard file
}

const loader = document.getElementById("loader");
function logout() {
  // Clear both sessionStorage and localStorage (for safety)
  sessionStorage.removeItem("adminToken");
  sessionStorage.removeItem("adminUsername");

  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUsername");

  // Redirect to login page
  window.location.href = "admin.html";
}

let inactivityTimer;

function startInactivityTimer() {
  clearTimeout(inactivityTimer); // Clear existing timer if any
  inactivityTimer = setTimeout(() => {
    // alert("You've been logged out due to inactivity.");
    logout(); // Your logout function
  }, 10 * 60 * 1000); // 30 minutes in milliseconds
}

// List of events that count as activity
["click", "mousemove", "keydown", "scroll", "touchstart"].forEach((event) => {
  window.addEventListener(event, startInactivityTimer);
});

startInactivityTimer();

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function fetchProducts() {
  try {
    const res = await fetch(
      "https://site-h33e.onrender.com/api/products/all"
    );
    const resOrders = await fetch(
      "https://site-h33e.onrender.com/api/orders/all"
    );
    const orders = await resOrders.json();
    const products = await res.json(); // this is an array of product objects

    console.log(products); // for debugging
    console.log(orders); // for debugging
    return [products, orders];
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

async function addProduct(form) {
  try {
    const formData = new FormData(form);

    formData.set("Status", form.querySelector("#productStatus").value);
    formData.set("ItemCategory", form.querySelector("#productCategory").value.toLowerCase());

    // const imageFile = document.querySelector("#productImage").files[0];
    // if (imageFile) {
    //   formData.set("ImageURL", imageFile); // will be processed by multer
    // }

    const res = await fetch("https://site-h33e.onrender.com/api/products/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
      },
      body: formData, // ✅ no JSON.stringify
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add product");

    alert("✅ Product added!");
    console.log(data.product);
  } catch (err) {
    console.error("Add Product Error:", err);
    alert("❌ " + err.message);
  }

  editForm.classList.add("hidden");
}



async function updateProduct(productId, updatedData) {
  const token = sessionStorage.getItem("adminToken");
  const formData = new FormData();

  // Append regular fields
  formData.append("ItemName", updatedData.ItemName);
  formData.append("ItemCategory", updatedData.ItemCategory);
  formData.append("Price", updatedData.Price);
  formData.append("Stock", updatedData.Stock);
  formData.append("Status", updatedData.Status);
  formData.append("Notes", updatedData.Notes);
  formData.append("InStock", updatedData.InStock === "true");


  // Only append image if provided
  if (updatedData.ImageURL) {
    formData.append("image", updatedData.ImageURL); // must be a File object
  }

  // ✅ Log the final data being sent
  console.log("🧪 Sending update form data:");
  console.log("Image file:", formData.get("image"));
  console.log("Other data:", {
    ItemName: formData.get("ItemName"),
    ItemCategory: formData.get("ItemCategory"),
    Price: formData.get("Price"),
    Stock: formData.get("Stock"),
    Status: formData.get("Status"),
    Notes: formData.get("Notes"),
    InStock: formData.get("InStock"),
  });

  try {
    const res = await fetch(
      `https://site-h33e.onrender.com/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't manually set Content-Type — let the browser handle it for FormData
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Server response: ${res.status} - ${errText}`);
    }

    const result = await res.json();
    console.log("✅ Product updated successfully:", result);
    alert("Product updated successfully!");
    location.reload(); // optional: refresh the product list
  } catch (err) {
    console.error("❌ Update Error:", err);
    alert("Failed to update product.");
  }
}

async function deleteProduct(productId) {
  try {
    const res = await fetch(
      `https://site-h33e.onrender.com/api/products/${productId}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      }
    );

    // Add the error handling check
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(`Expected JSON, got: ${text.substring(0, 100)}...`);
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete");

    alert("🗑️ Product deleted");
    console.log(data);
  } catch (err) {
    console.error("Delete Error:", err);
    alert("❌ " + err.message);
    throw err;
  }
}

async function getProductIdByName(name) {
  const products = await fetchProducts(); // Fetch all from DB
  const trimmedName = name.trim().toLowerCase();

  const found = products[0].find(
    (p) => p.ItemName.trim().toLowerCase() === trimmedName
  );
  console.log("Looking for:", trimmedName);
  products[0].forEach((p) => console.log("→", p.ItemName.toLowerCase()));

  if (found) {
    console.log("✅ Found ID:", found._id);
    return found._id;
  } else {
    console.warn("❌ Product not found with name:", name);
    return null;
  }
}

const submitProduct = document.getElementById("submitProduct");
const cancelAddProduct = document.getElementById("cancelAddProduct");
const addProductButton = document.getElementById("addProductButton");

addProductButton.addEventListener("click", () => {
  document.querySelector(".formContainer").classList.remove("hidden");
});

cancelAddProduct.addEventListener("click", () => {
  document.querySelector(".formContainer").classList.add("hidden");
});

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const addProductForm = document.getElementById("addProductForm");

addProductForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  await addProduct(addProductForm); // 💡 Pass the form element
});


const productsList = document.querySelector(".productsList");
const categoryItemName = document.querySelector(".categoryItemName");
const editProductButton = document.getElementById("editProductButton");
const editForm = document.getElementById("editProductForm");
const ordersList = document.querySelector(".newOrdersContainer");
const totalProducts = document.getElementById("totalProducts")
const totalOrders = document.getElementById("totalOrders")

// Usage
let numberOfProducts = 0;
const loadProducts = () => {
  productsList.innerHTML = `
                  <div class="loader-overlay" id="loader">
                                                          <div class="spinner"></div>
                                                       </div>
  `;

  loader.style.display = "flex";
  fetchProducts().then((products) => {
    // Now you can loop through products or display them
    console.log("Here");
    numberOfProducts = 0; // Reset the count for each load
    document.querySelectorAll(".loader-overlay").forEach((el) => el.remove());
    products[1].forEach((order) => {

      // if (order.orderStatus === "active") {
      ordersList.innerHTML += `    <div class="orderr">                                                        
        <h3>👤 ${order.userName}</h3>
        <p>📧 <strong>Email:</strong> ${order.userEmail}</p>
        <p>🛍️ <strong>Products:</strong><br> ${order.productsNames
          .map((p) => `• ${p}`)
          .join("<br>")}</p>
        <p>💵 <strong>Total:</strong> GHS ${order.totalPrice}</p>
        <button class="done">Done</button>
        </div>
        `;
      // }
    });
    window.allOrders = products[1]
    totalOrders.nextElementSibling.innerHTML = window.allOrders.length
    products[0].forEach((product) => {
      if (currentCategory.toLowerCase() === product.ItemCategory) {
        console.log("kok");
        // Remove any loader-overlay elements before displaying products
        productsList.innerHTML += `
                                                                <div class="product">
                                                              <div class="productDetails">
                                                                  <h3 class="pName">${product.ItemName}</h3>
                                                                  <p>Price: $${product.Price}</p>
                                                                  <button class="editProductButton" title="Edit">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                                                  </button>
                                                                  <button class="deleteProductButton" title="Delete">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                                                  </button>
                                                              </div>
                                                          </div>
        `;
      }
    });
    document.querySelector(".categoryItemName").textContent = currentCategory;
    document.querySelector(".categoryItemName").textContent +=
      " " + document.querySelectorAll(".product").length;

    // After products are rendered
    document.querySelectorAll(".deleteProductButton").forEach((button) => {
      button.addEventListener("click", async function () {
        const productCard = this.closest(".product");
        const productName = productCard.querySelector(".pName").textContent;

        // Confirm and delete logic here
        if (confirm(`Are you sure you want to delete "${productName}"?`)) {
          // Add backend deletion logic if needed
          let id = await getProductIdByName(productName);
          deleteProduct(id);
          loadProducts();
        }
      });
    });

    document.querySelectorAll(".editProductButton").forEach((button) => {
      button.addEventListener("click", function () {
        const productCard = this.closest(".product");
        const productName = productCard.querySelector(".pName").textContent;
        const foundProduct = products[0].find(
          (product) => product.ItemName === productName
        );

        const productNameBox = editForm.querySelector("#eproductName");
        const productPrice = editForm.querySelector("#eproductPrice");
        console.log(
          "✅ Setting category to:",
          capitalizeWords(foundProduct.ItemCategory)
        );
        const productCategory = editForm.querySelector("#eproductCategory");
        const productStock = editForm.querySelector("#eproductStock");
        const productInStock = editForm.querySelector("#eproductInStock");
        const productNotes = editForm.querySelector("#eproductNotes");
        const productImageURL = editForm.querySelector("#eproductImage");
        currentlyEditingProductName = productName;

        if (foundProduct) {
          productNameBox.value = foundProduct.ItemName;
          productPrice.value = foundProduct.Price;
          productCategory.value = capitalizeWords(foundProduct.ItemCategory);
          productStock.value = foundProduct.Stock;
          productInStock.value = foundProduct.InStock;
          productNotes.value = foundProduct.Notes;
          // productImageURL.value = foundProduct.ImageURL;
        } else {
          console.warn("Product not found");
        }

        editForm.parentElement.classList.remove("hidden");
      });
    });

    editForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const productName = document.querySelector("#eproductName").value;
      const productPrice = document.querySelector("#eproductPrice").value;
      const productCategory = document
        .querySelector("#eproductCategory")
        .value.toLowerCase();
      const productStock = document.querySelector("#eproductStock").value;
      const productStatus = document.querySelector("#eproductStatus").value;
      const productNotes = document.querySelector("#eproductNotes").value;
      const productInStock = document.querySelector("#eproductInStock").checked; // ✅ checkbox uses .checked
      const imageFile = document.querySelector("#eproductImage").files[0]; // ✅ will be undefined if no file selected

      const id = await getProductIdByName(productName);
      if (!id) {
        alert("❌ Could not find product ID.");
        return;
      }

      // 🧪 Debug logs
      console.log("📦 Preparing updated product:");
      console.log("Name:", productName);
      console.log("Image file:", imageFile);

      const updatedData = {
        ImageURL: imageFile || null, // ✅ Only include if file selected
        ItemName: productName,
        ItemCategory: productCategory,
        Price: parseFloat(productPrice.split("-")[0]) || 0,
        Stock: parseInt(productStock, 10) || 0,
        Status:
          productStatus.toLowerCase() === "in stock"
            ? "available"
            : "unavailable",
        Notes: productNotes || "",
        InStock: productInStock,
      };

      try {
        await updateProduct(id, updatedData);
        loadProducts();
      } catch (err) {
        console.error("Update failed:", err);
        alert("❌ Failed to update product.");
      }
    });

    // or save them to a global variable
    window.allProducts = products[0];
    totalProducts.nextElementSibling.innerHTML = window.allProducts.length

  });
};


const editCancelButton = document.getElementById("cancelEditProduct");

editCancelButton.addEventListener("click", () => {
  editForm.parentElement.classList.add("hidden");
});

const adminNameElement = document.getElementById("adminName");
const adminName = sessionStorage.getItem("adminUsername") || "Admin";
const currentPage = document.querySelector(".currentPage");
const sideBar = document.querySelector(".sideBar");
let menuShow = false;
currentPage.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent the click from propagating to the window
  if (!menuShow) {
    currentPage.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        <span>Dashboard</span>
        `;
    document.querySelector(".sideBar").style.left = "0";
    menuShow = true;
  }
});

window.addEventListener("click", (e) => {
  currentPage.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/>
            </svg>
            <span>Dashboard</span>
        `;
  sideBar.style.left = "-500px";
  menuShow = false;
});

adminNameElement.textContent = adminName || "Admin"; // Fallback to "Admin" if not set
loadProducts();
const cancelLogout = document.getElementById("cancelLogout");
const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", function () {
  document
    .getElementsByClassName("logoutScreenPopup")[0]
    .classList.remove("hidden");
});

cancelLogout.addEventListener("click", function () {
  document
    .getElementsByClassName("logoutScreenPopup")[0]
    .classList.add("hidden");
});

const categoryDisplay = document.getElementById("categoryDisplay");
let currentCategory = "Foreign Sim Cards";
const categoriesOfProducts = [
  "Foreign Sim Cards",
  "Gift Cards",
  "Virtual Credit Cards",
  "Payment Cards",
  "Telco Pre-paid Cards",
  "Subscriptions",
];
const categories = document.getElementById("categories1");

for (let item = 0; item < categories.children.length; item++) {
  categories.children[item].addEventListener("click", () => {
    for (let index = 0; index < categories.children.length; index++) {
      const element = categories.children[index];
      element.classList.remove("selected");
      // categoryDisplay.children[index].classList.remove("show")
    }
    categories.children[item].classList.add("selected");
    currentCategory = categoriesOfProducts[item];
    categoryItemName.textContent = currentCategory;
    loadProducts();
    // categoryDisplay.children[item].classList.add("show")
  });
}
