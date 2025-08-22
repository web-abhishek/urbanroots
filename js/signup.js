document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');
  const googleSignupBtn = document.getElementById('googleSignup');
  const termsCheckbox = document.getElementById('termsCheckbox');
  
  // Form validation
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset error states
    resetErrors();
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAgreed = termsCheckbox.checked;
    
    // Validation flags
    let isValid = true;
    
    // Validate full name
    if (fullName.length < 3) {
      showError('fullName', 'Full name must be at least 3 characters');
      isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate password
    if (password.length < 7) {
      showError('password', 'Password must be at least 8 characters');
      isValid = false;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
      showError('confirmPassword', 'Passwords do not match');
      isValid = false;
    }
    
    // Validate terms checkbox
    if (!termsAgreed) {
      showError('termsCheckbox', 'You must agree to the terms and conditions');
      isValid = false;
    }
    
    // If valid, submit form
    if (isValid) {
      submitForm({
        fullName,
        email,
        password
      });
    }
  });
  
  // Google signup handler
  googleSignupBtn.addEventListener('click', function() {
    // In a real app, this would trigger Google OAuth flow
    console.log('Google signup clicked');
    alert('Google signup would be implemented here');
  });
  
  // Helper functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}Error`);
    
    field.classList.add('is-invalid');
    errorElement.textContent = message;
  }
  
  function resetErrors() {
    const errorElements = document.querySelectorAll('.invalid-feedback');
    const invalidFields = document.querySelectorAll('.is-invalid');
    
    errorElements.forEach(el => {
      el.textContent = '';
    });
    
    invalidFields.forEach(field => {
      field.classList.remove('is-invalid');
    });
  }
  
  function submitForm(formData) {
    // In a real application, you would send this to your backend
    console.log('Form data:', formData);
    
    // Show success message
    const successElement = document.getElementById('signupSuccess');
    successElement.classList.remove('d-none');
    
    // Disable form
    signupForm.querySelectorAll('input, button').forEach(el => {
      el.disabled = true;
    });
    
    // Simulate redirect after 2 seconds
    setTimeout(() => {
      window.location.href = 'user-dashboard.html'; 
    }, 2000);
  }
});