const loginForm = document.getElementById('loginForm');
const notification = document.getElementById('notification');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === '' || password === '') {
    showNotification('Please enter both username and password.', 'error');
  } else if (username === 'challenger' && password === 'complete') {
    showNotification('Login successful.', 'success');
  } else {
    showNotification('Incorrect username or password.', 'error');
  }

  loginForm.reset();
});

function showNotification(message, type) {
  notification.innerHTML = message;
  notification.className = `toast ${type}`;
  notification.style.display = 'block';

  setTimeout(function() {
    notification.style.display = 'none';
  }, 3000);
}
