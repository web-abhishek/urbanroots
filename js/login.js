console.log("Login script loaded");
// login.js

// --- DOM Element Selection ---
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');
const loginButton = document.getElementById('login-button');
const googleLoginButton = document.getElementById('google-login-button');
const messageContainer = document.getElementById('message-container');

function displayMessage(message, type) {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    messageContainer.innerHTML = `<div class="alert ${alertClass}" role="alert">${message}</div>`;
}

function handleLogin(event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;

    messageContainer.innerHTML = '';

    if (!email || !password) {
        displayMessage('Please enter both email and password.', 'error');
        return;
    }

    const hardcodedEmail = 'test@gmail.com';
    const hardcodedPassword = 'pass123';

    if (email === hardcodedEmail && password === hardcodedPassword) {
        displayMessage('Login successful! Redirecting...', 'success');

        if (rememberMe) {
            localStorage.setItem('userEmail', email);
        } else {
            localStorage.removeItem('userEmail');
        }

        setTimeout(() => {
            window.location.href = 'user-dashboard.html';
        }, 1500);

    } else {
        displayMessage('Invalid email or password. Please try again.', 'error');
    }
}

function handleGoogleLogin() {
    displayMessage('Google login functionality requires a backend. This is a placeholder.', 'error');
}

loginForm.addEventListener('submit', handleLogin);
googleLoginButton.addEventListener('click', handleGoogleLogin);

document.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
    }
});
