// ===============================
// CARGAR PERFIL
// ===============================
window.addEventListener("load", () => {
  cargarUsuario();
  cargarEventos();
  cargarPropuestas();
});

// ===============================
// USUARIO
// ===============================
function cargarUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("nombreUsuario").innerText = usuario.nombre;
  document.getElementById("codigoUsuario").innerText = usuario.email;
}

// ===============================
// EVENTOS INSCRITOS
// ===============================
function cargarEventos() {
  const contenedor = document.getElementById("listaEventos");

  let eventos = JSON.parse(sessionStorage.getItem("inscritos")) || [];

  contenedor.innerHTML = "";

  if (eventos.length === 0) {
    contenedor.innerHTML = "<div class='card'>No tienes eventos aún</div>";
    return;
  }

  eventos.forEach((evento) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <strong>${evento}</strong>
      <span>Inscrito correctamente</span>
    `;

    contenedor.appendChild(div);
  });
}

function cargarPropuestas() {
  const contenedor = document.getElementById("listaPropuestas");

  let propuestas = JSON.parse(localStorage.getItem("propuestas")) || [];

  contenedor.innerHTML = "";

  if (propuestas.length === 0) {
    contenedor.innerHTML = "<div class='card'>No tienes propuestas</div>";
    return;
  }

  propuestas.forEach((p) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <strong>${p.titulo}</strong>
      <span>Estado: ${p.estado}</span>
    `;

    contenedor.appendChild(div);
  });
}

// ===============================
// PROPUESTAS
// ===============================
function cargarPropuestas() {
  const lista = document.getElementById("listaPropuestas");

  let propuestas = JSON.parse(localStorage.getItem("propuestas")) || [];

  lista.innerHTML = "";

  if (propuestas.length === 0) {
    lista.innerHTML = "<li>No tienes propuestas</li>";
    return;
  }

  propuestas.forEach((p) => {
    const li = document.createElement("li");
    li.innerText = p.titulo + " (" + p.estado + ")";
    lista.appendChild(li);
  });
}

// ===============================
// LOGOUT
// ===============================
window.cerrarSesion = function () {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
};

localStorage.setItem("nombreUsuario", nombre);
localStorage.setItem("codigoUsuario", codigo);

window.volver = function () {
  window.location.href = "eventos.html";
};
