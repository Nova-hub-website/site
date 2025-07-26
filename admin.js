// Login Handler
// ✅ Auto-redirect if already logged in
const token = sessionStorage.getItem("adminToken");
if (token) {
  window.location.href = "adminDashboard.html"; // or your actual dashboard file
}


document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("messageLogin");
  message.textContent = "Logging in...";

  try {
    const res = await fetch("https://novahub-backend.onrender.com/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      message.style.color = "green";
      message.textContent = "Login successful ✅";
      sessionStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUsername", username);
      setTimeout(() => {
        window.location.href = "adminDashboard.html"; // change to your dashboard file
      }, 1000);
    } else {
      message.style.color = "red";
      message.textContent = data.message || "Login failed";
    }
  } catch (err) {
    message.textContent = "Server error";
    console.error(err);
  }
});

// Register Handler
// document.getElementById("registerForm").addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const username = document.getElementById("registerUsername").value.trim();
//   const password = document.getElementById("registerPassword").value;
//   const message = document.getElementById("messageRegister");
//   message.textContent = "Registering...";

//   try {
//     const res = await fetch("https://novahub-backend.onrender.com/api/admin/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password })
//     });

//     const data = await res.json();

//     if (res.ok) {
//       message.style.color = "green";
//       message.textContent = "Registration successful ✅";
//     } else {
//       message.style.color = "red";
//       message.textContent = data.message || "Registration failed";
//     }
//   } catch (err) {
//     message.textContent = "Server error";
//     console.error(err);
//   }
// });
