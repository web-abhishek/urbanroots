// console.log("hello from checkout !!");

const checkoutForm = document.getElementById('checkout-form');
const orderItemsContainer = document.getElementById('order-items-container');
const orderSubtotalElement = document.getElementById('order-subtotal');
const orderDiscountElement = document.getElementById('order-discount');
const orderShippingElement = document.getElementById('order-shipping');
const orderTotalElement = document.getElementById('order-total');

function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function renderOrderItems(cart) {
    orderItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p class="text-center p-3">Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const orderItemHtml = `
            <div class="product mb-2">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" width="50" />
                    <div class="ms-3">
                        <div><strong>${item.name}</strong></div>
                        <div class="small-text">123456</div>
                        <div class="small-text">Quantity: ${item.quantity}</div>
                    </div>
                </div>
                <div class="text-success">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `;
        orderItemsContainer.innerHTML += orderItemHtml;
    });
}

function calculateTotals(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 16.00;
    const discount = 0.00;
    const total = subtotal - discount + shipping;

    orderSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    orderDiscountElement.textContent = `(-) $${discount.toFixed(2)}`;
    orderShippingElement.textContent = `$${shipping.toFixed(2)}`;
    orderTotalElement.textContent = `$${total.toFixed(2)}`;
}

function handleFormSubmit(event) {
    event.preventDefault();

    const requiredFields = document.querySelectorAll('#checkout-form [required]');
    let allFieldsValid = true;
    requiredFields.forEach(field => {
        if (!field.value) {
            allFieldsValid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });

    if (!allFieldsValid) {
        alert("Please fill in all required fields.");
        return;
    }

    const cart = getCartFromLocalStorage();
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before placing an order.");
        return;
    }

    alert("Order placed successfully! Thank you for your purchase.");

    localStorage.removeItem('cart');
    window.location.href = "login.html";
}

function initializeCheckoutPage() {
    const cart = getCartFromLocalStorage();
    renderOrderItems(cart);
    calculateTotals(cart);
}

checkoutForm.addEventListener('submit', handleFormSubmit);

document.addEventListener('DOMContentLoaded', initializeCheckoutPage);
