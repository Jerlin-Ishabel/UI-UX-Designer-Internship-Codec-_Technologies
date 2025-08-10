let users = {};

function toggleForm() {
  const login = document.getElementById("loginForm");
  const register = document.getElementById("registerForm");
  const title = document.getElementById("formTitle");
  const toggleText = document.getElementById("toggleText");

  if (login.style.display === "none") {
    login.style.display = "block";
    register.style.display = "none";
    title.textContent = "Login";
    toggleText.innerHTML = `Don't have an account? <a href="#" onclick="toggleForm()">Register here</a>`;
  } else {
    login.style.display = "none";
    register.style.display = "block";
    title.textContent = "Register";
    toggleText.innerHTML = `Already have an account? <a href="#" onclick="toggleForm()">Login here</a>`;
  }
}

function register() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  if (username === "" || password === "") {
    alert("Please fill all fields.");
    return;
  }

  if (users[username]) {
    alert("Username already exists!");
  } else {
    users[username] = password;
    alert("Registered successfully! Now login.");
    toggleForm();
  }
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (users[username] && users[username] === password) {
    alert("Login successful!");
  } else {
    alert("Invalid credentials!");
  }
}
