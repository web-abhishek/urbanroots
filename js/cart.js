// console.log("hello from cart !!");

const cartItemContainer = document.getElementById("cart-item-container");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartDiscount = document.getElementById("cart-discount");
const cartShipping = document.getElementById("cart-shipping");
const cartTotal = document.getElementById("cart-total");

function getCartFromlocalStorage() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function renderCartItems(cart) {
  cartItemContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className =
      "d-flex align-items-center justify-content-between bg-white p-3 mb-3 rounded shadow-sm";

    cartItem.innerHTML = `
            <div class="d-flex align-items-center gap-3">
              <img src="${item.image}" alt="${item.name}" width="60" />
              <div>
                <h6 class="mb-0 fw-semibold">${item.name}</h6>
                <small class="text-tertiary">SKU: 1995751877966</small>
              </div>
            </div>
            <div class="d-flex align-items-center gap-4">
              <span class="fw-semibold">$${item.price}</span>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-success rounded-circle" onclick="updateQuantity(
                ${item.id}, 'decrement')" ${item.quantity <= 1 ? 'disabled' : ''}>
                  -
                </button>
                <span>${item.quantity}</span>
                <button class="btn btn-success rounded-circle" onclick="updateQuantity(${
                  item.id
                }, 'increment')">
                  +
                </button>
              </div>
              <span class="fw-semibold">$${(item.price * item.quantity).toFixed(
                2
              )}</span>
              <button class="btn" onclick="removeItem(${item.id})">
                <i class="bi bi-trash"></i>
              </button>
            </div>
        `;
    cartItemContainer.append(cartItem);
    // cartItemContainer.innerHTML += cartItem;
  });
}

function updateQuantity(productId, action) {
  let cart = getCartFromlocalStorage();

  const item = cart.find((item) => item.id === productId);
  if (item) {
    if (action === "increment") {
      item.quantity++;
    } else if (action === "decrement") {
      item.quantity--;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(productId) {
  let cart = getCartFromlocalStorage();

  cart = cart.filter((item) => item.id !== productId);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function calculateTotals(cart) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 16.0;
  const discount = 0.0;
  const total = subtotal - discount + shipping;

  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartDiscount.textContent = `(-) $${discount.toFixed(2)}`;
  cartShipping.textContent = `$${shipping.toFixed(2)}`;
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function checkout() {
  alert("Proceeding to checkout!");
  console.log("go to checkout page!!");
  window.location.href = "checkout.html";
}

function loadCart() {
  const cart = getCartFromlocalStorage();
  renderCartItems(cart);
  calculateTotals(cart);
}

window.updateQuantity = updateQuantity;
window.removeItem = removeItem;
window.checkout = checkout;

document.addEventListener("DOMContentLoaded", loadCart);
