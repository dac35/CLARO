import { db, collection, getDocs } from "./firebase.js";

// ===============================
// INICIO
// ===============================
window.addEventListener("load", () => {
  verificarAdmin();
  cargarInscripciones();
  cargarPropuestas();
});

// ===============================
// SEGURIDAD
// ===============================
function verificarAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || usuario.rol !== "admin") {
    window.location.href = "login.html";
  }
}

// ===============================
// INSCRIPCIONES (FIREBASE)
// ===============================
async function cargarInscripciones() {
  const contenedor = document.getElementById("listaInscripciones");

  contenedor.innerHTML = "Cargando...";

  try {
    const snapshot = await getDocs(collection(db, "inscripciones"));

    contenedor.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();

      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <strong>${data.evento}</strong>
        <span>👤 ${data.nombre}</span>
        <span>🆔 ${data.codigo}</span>
      `;

      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    contenedor.innerHTML = "Error cargando datos";
  }
}

// ===============================
// PROPUESTAS (LOCAL)
// ===============================
function cargarPropuestas() {
  const contenedor = document.getElementById("listaPropuestas");

  let propuestas = JSON.parse(localStorage.getItem("propuestas")) || [];

  contenedor.innerHTML = "";

  if (propuestas.length === 0) {
    contenedor.innerHTML = "<div class='card'>No hay propuestas</div>";
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
// BOTONES
// ===============================
window.volver = function () {
  window.location.href = "eventos.html";
};

window.cerrarSesion = function () {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
};
