// ===============================
// BOTONES
// ===============================
const registerBtn = document.getElementById("registerButton");
const loginBtn = document.getElementById("loginButton");

// ===============================
// REGISTRO
// ===============================
if (registerBtn) {
  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (!nombre || !email || !password) {
      alert("Completa todos los campos");
      return;
    }

    // 🔥 guardar usuario local
    const usuario = { nombre, email };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Cuenta creada ✅");

    window.location.href = "perfiles.html";
  });
}

// ===============================
// LOGIN
// ===============================
// ===============================
// LOGIN CON ROLES
// ===============================
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      alert("Completa los campos");
      return;
    }

    let usuario = null;

    // 🔥 ADMIN
    if (email === "admin@claro.com" && password === "123456") {
      usuario = {
        nombre: "Administrador",
        email: email,
        rol: "admin",
      };
    }

    // 🔥 USUARIO NORMAL
    else if (email === "usuario@claro.com" && password === "123456") {
      usuario = {
        nombre: "Usuario",
        email: email,
        rol: "usuario",
      };
    }

    // ❌ ERROR
    else {
      alert("Credenciales incorrectas");
      return;
    }

    // 💾 GUARDAR SESIÓN
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // 🔀 REDIRECCIÓN SEGÚN ROL
    if (usuario.rol === "admin") {
      window.location.href = "admin.html"; // (puedes crear luego)
    } else {
      window.location.href = "perfiles.html";
    }
  });
}
