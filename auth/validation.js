export function setupValidation() {
  // Login form validation
  document.getElementById('login-email')?.addEventListener('input', (e) => {
    const errorElement = document.getElementById('login-email-error');
    if (!e.target.value.includes('@')) {
      errorElement.textContent = 'Please enter a valid email address';
    } else {
      errorElement.textContent = '';
    }
  });
  
  document.getElementById('login-password')?.addEventListener('input', (e) => {
    const errorElement = document.getElementById('login-password-error');
    if (e.target.value.length < 6) {
      errorElement.textContent = 'Password must be at least 6 characters';
    } else {
      errorElement.textContent = '';
    }
  });
  
  // Register form validation
  document.getElementById('register-username')?.addEventListener('input', (e) => {
    const errorElement = document.getElementById('register-username-error');
    if (e.target.value.length < 3) {
      errorElement.textContent = 'Username must be at least 3 characters';
    } else {
      errorElement.textContent = '';
    }
  });
  
  document.getElementById('register-email')?.addEventListener('input', (e) => {
    const errorElement = document.getElementById('register-email-error');
    if (!e.target.value.includes('@')) {
      errorElement.textContent = 'Please enter a valid email address';
    } else {
      errorElement.textContent = '';
    }
  });
  
  document.getElementById('register-password')?.addEventListener('input', (e) => {
    const errorElement = document.getElementById('register-password-error');
    if (e.target.value.length < 6) {
      errorElement.textContent = 'Password must be at least 6 characters';
    } else {
      errorElement.textContent = '';
    }
  });
  
  document.getElementById('register-confirm-password')?.addEventListener('input', (e) => {
    const errorElement = document.getElementById('register-confirm-password-error');
    const password = document.getElementById('register-password').value;
    
    if (e.target.value !== password) {
      errorElement.textContent = 'Passwords do not match';
    } else {
      errorElement.textContent = '';
    }
  });
  
  // Reset password validation
  document.getElementById('new-password')?.addEventListener('input', (e) => {
    const errorElement = document.getElementById('new-password-error');
    if (e.target.value.length < 6) {
      errorElement.textContent = 'Password must be at least 6 characters';
    } else {
      errorElement.textContent = '';
    }
  });
  
  document.getElementById('confirm-new-password')?.addEventListener('input', (e) => {
    const errorElement = document.getElementById('confirm-new-password-error');
    const password = document.getElementById('new-password').value;
    
    if (e.target.value !== password) {
      errorElement.textContent = 'Passwords do not match';
    } else {
      errorElement.textContent = '';
    }
  });
}
