// Simulated database
const usersDB = JSON.parse(localStorage.getItem('portfolioUsers')) || [];
const passwordResetsDB = JSON.parse(localStorage.getItem('passwordResets')) || [];

export function setupAuth() {
  // Login form submission
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Find user
    const user = usersDB.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Successful login
      localStorage.setItem('portfolioUser', JSON.stringify(user));
      window.location.reload();
    } else {
      // Failed login
      document.getElementById('login-password-error').textContent = 
        'Invalid email or password';
      btn.classList.remove('loading');
    }
  });
  
  // Register form submission
  document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    // Check if user already exists
    if (usersDB.some(u => u.email === email)) {
      document.getElementById('register-email-error').textContent = 
        'Email already registered';
      btn.classList.remove('loading');
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password // In real app, you would hash this
    };
    
    usersDB.push(newUser);
    localStorage.setItem('portfolioUsers', JSON.stringify(usersDB));
    
    // Auto-login after registration
    localStorage.setItem('portfolioUser', JSON.stringify(newUser));
    window.location.reload();
  });
  
  // Forgot password form
  document.getElementById('forgotPasswordForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const email = document.getElementById('reset-email').value;
    const user = usersDB.find(u => u.email === email);
    
    if (user) {
      // Generate reset token (simplified for demo)
      const resetToken = `reset-${Date.now()}`;
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now
      
      // Save reset request
      passwordResetsDB.push({
        email,
        token: resetToken,
        expiresAt
      });
      
      localStorage.setItem('passwordResets', JSON.stringify(passwordResetsDB));
      
      // In a real app, you would send an email with this link
      const resetLink = `${window.location.origin}${window.location.pathname}?resetToken=${resetToken}`;
      
      alert(`Password reset link generated! In a real app, this would be sent by email.\n\n${resetLink}`);
      
      // Close modal
      document.getElementById('forgotPasswordModal').classList.remove('active');
    } else {
      document.getElementById('reset-email-error').textContent = 
        'No account found with this email';
    }
    
    btn.classList.remove('loading');
  });
  
  // Reset password form
  document.getElementById('resetPasswordForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const token = document.getElementById('reset-token').value;
    const newPassword = document.getElementById('new-password').value;
    
    // Find reset request
    const resetRequest = passwordResetsDB.find(r => r.token === token);
    
    if (resetRequest && new Date(resetRequest.expiresAt) > new Date()) {
      // Find user and update password
      const userIndex = usersDB.findIndex(u => u.email === resetRequest.email);
      if (userIndex !== -1) {
        usersDB[userIndex].password = newPassword; // In real app, hash this
        localStorage.setItem('portfolioUsers', JSON.stringify(usersDB));
        
        // Remove used reset token
        const updatedResets = passwordResetsDB.filter(r => r.token !== token);
        localStorage.setItem('passwordResets', JSON.stringify(updatedResets));
        
        alert('Password updated successfully! You can now login with your new password.');
        window.location.href = window.location.pathname;
      }
    } else {
      alert('Invalid or expired reset token. Please try again.');
    }
    
    btn.classList.remove('loading');
  });
}
