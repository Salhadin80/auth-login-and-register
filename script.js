import { setupAuth } from './auth/auth.js';
import { setupUI } from './auth/ui.js';
import { setupValidation } from './auth/validation.js';
import { auth } from '/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  setupAuth();
  setupUI();
  setupValidation();
  
  // Check if user is already logged in
  if (localStorage.getItem('portfolioUser')) {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('dashboard-username').textContent = 
      JSON.parse(localStorage.getItem('portfolioUser')).username;
  }
  
  // Handle logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('portfolioUser');
    window.location.reload();
  });
  
  // Check for password reset token in URL
  const urlParams = new URLSearchParams(window.location.search);
  const resetToken = urlParams.get('resetToken');
  
  if (resetToken) {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('resetPasswordContainer').classList.remove('hidden');
    document.getElementById('reset-token').value = resetToken;
  }
});
