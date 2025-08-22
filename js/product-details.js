const productContainer = document.getElementById("product-container");
const tabsContainer = document.getElementById("productTabsContent"); // Add this reference

let allProducts = [];
let currentProduct = null;
let currentQuantity = 1;

async function loadProductDetails() {
  const productId = parseInt(localStorage.getItem("productId"));
  console.log("Product ID:", productId);

  if (isNaN(productId)) {
    productContainer.innerHTML =
      '<p class="text-danger">Product ID not found. Please go back to the shop page.</p>';
    return;
  }

  try {
    const response = await fetch("../js/product.json");
    const data = await response.json();
    allProducts = data.products;

    const product = allProducts.find((p) => p.id === productId);

    if (product) {
      currentProduct = product;
      renderProduct(product);
      renderProductTabs(product); // Call separate function for tabs
    } else {
      productContainer.innerHTML = "<p>Product not found</p>";
    }
  } catch (error) {
    console.error("Error loading products:", error);
    productContainer.innerHTML =
      '<p class="text-danger">Error loading product details. Please try again later.</p>';
  }
}

function renderProduct(product) {
  productContainer.innerHTML = `
      <div class="col-md-6 text-center">
          <div class="wrapper">
            <div class="img-selection">
              ${product.images
                .map(
                  (img, i) => `
                <div class="img-thumbnail${i === 0 ? " selected" : ""}">
                  <img src="${img}" alt="${product.name}${
                    i === 0
                      ? ""
                      : i === 1
                      ? " - alternative view"
                      : " - close up"
                  }" width="100%" />
                </div>
              `
                )
                .join("")}
            </div>
            <div class="big-img">
              <img src="${product.images[0]}" alt="${
    product.name
  }" class="display-img" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h3 class="fw-bold mb-2" id="proddetailsname">${product.name}</h3>
          <h5 class="text-success mb-3" id="proddetailsprice">$${product.price.toFixed(
            2
          )}</h5>

          <div class="d-flex align-items-center mb-3">
            <div class="text-warning me-2">${product.rating || "★★★★☆"}</div>
          </div>

          <p class="fw-semibold mb-1">Short Description:</p>
          <p class="text-tertiary" id="proddetailsdescription">${
            product.description
          }</p>

          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="d-flex align-items-center border rounded px-2 py-1">
              <button class="btn btn-outline-secondary rounded-circle p-1 quantity-btn" onclick="updateQuantity('decrement')" ${
                currentQuantity <= 1 ? "disabled" : ""
              }>-</button>
              <span class="quantity-display px-2" id="quantityDisplay">${currentQuantity}</span>
              <button class="btn btn-outline-secondary rounded-circle p-1 quantity-btn" onclick="updateQuantity('increment')">+</button>
            </div>

            <button class="btn btn-primary px-4" onclick="addToCart()">Add To Cart</button>
          </div>

          <p class="mb-1 small text-tertiary">SKU: ${
            product.sku || generateSKU(product.id)
          }</p>
          <p class="mb-1 small text-tertiary">
            Categories: <span class="text-dark">${product.category}</span>
          </p>
          <p class="small text-tertiary">
            Tags: <span class="text-dark">Home, Garden, Plants</span>
          </p>
        </div>
  `;
}

// NEW FUNCTION: Render product tabs content
function renderProductTabs(product) {
  const specContainer = document.getElementById("tabSpecificationContent");
  const tabDetailsContent = document.getElementById("tabDetailsContent");

  // Render Details tab content
  if (product.longdetails && product.longdetails.length > 0) {
    console.log("Product long details found:", product.longdetails);
    tabDetailsContent.innerHTML = `
      <div class="about-plant">
        <p>${product.longdetails}</p>
      </div>
    `;
  } else {
    tabDetailsContent.innerHTML = `
      <div class="about-plant">
        <h4 class="mb-4">About this Plant</h4>
        <p>No detailed information available for this plant.</p>
      </div>
    `;
  }

  // Render Specifications tab content
  if (product.specification && product.specification.length > 0) {
    console.log("Product specifications found:", product.specification);
    
    specContainer.innerHTML = `
      <div class="specs-table">
        ${product.specification
          .map(
            (spec) => `
          <div class="spec-row">
            <div class="spec-label">${spec.split(':')[0]}:</div>
            <div class="spec-value">${spec.split(':')[1] || spec}</div>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  } else {
    specContainer.innerHTML = `
      <h4 class="mb-4">Technical Specifications</h4>
      <p>No specifications available for this plant.</p>
    `;
  }
}

function updateQuantity(action) {
  if (action === "increment") {
    currentQuantity++;
  } else if (action === "decrement" && currentQuantity > 1) {
    currentQuantity--;
  }

  const quantityDisplay = document.getElementById("quantityDisplay");
  if (quantityDisplay) {
    quantityDisplay.textContent = currentQuantity;
  }
  const decrementBtn = document.querySelector(
    "button[onclick=\"updateQuantity('decrement')\"]"
  );
  if (decrementBtn) {
    decrementBtn.disabled = currentQuantity <= 1;
  }
}

function addToCart() {
  if (!currentProduct) {
    console.error("No product selected");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.id === currentProduct.id);

  if (existingItem) {
    existingItem.quantity += currentQuantity;
  } else {
    cart.push({
      id: currentProduct.id,
      quantity: currentQuantity,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image,
      category: currentProduct.category,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${currentProduct.name} (x${currentQuantity}) added to cart!`);
  window.location.href = "cart.html";
}

function generateSKU(id) {
  return `PLANT${id.toString().padStart(4, "0")}${Math.random()
    .toString(36)
    .substr(2, 5)
    .toUpperCase()}`;
}

// Make functions available globally
window.updateQuantity = updateQuantity;
window.addToCart = addToCart;

document.addEventListener("DOMContentLoaded", loadProductDetails);

// Add image selection functionality
document.addEventListener("click", function (e) {
  if (e.target.closest(".img-thumbnail")) {
    const thumbnails = document.querySelectorAll(".img-thumbnail");
    thumbnails.forEach((thumb) => thumb.classList.remove("selected"));
    e.target.closest(".img-thumbnail").classList.add("selected");

    const bigImg = document.querySelector(".big-img img.display-img");
    if (bigImg && e.target.tagName === "IMG") {
      bigImg.src = e.target.src;
    }
  }
});