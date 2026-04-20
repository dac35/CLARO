function obtenerMascota(puntaje) {
  if (puntaje === 100) return "robot";
  if (puntaje >= 80) return "normal";
  return null;
}

export function initMascota(puntaje) {
  const tipo = obtenerMascota(puntaje);
  const container = document.getElementById("companion");

  if (!tipo) return;

  container.innerHTML = crearMascota(tipo);

  container.onclick = () => mostrarMensaje(tipo);
}

export function mostrarRegalo(puntaje) {
  const overlay = document.getElementById("giftOverlay");

  if (puntaje < 80) return;

  overlay.classList.remove("hidden");

  overlay.innerHTML = `
    <div class="gift-box">
      🎁
      <p>¡Te ganaste un regalo!</p>
      <small>Haz clic para abrir</small>
    </div>
  `;

  overlay.onclick = () => {
    overlay.innerHTML = "";
    mostrarMascotaGrande(puntaje);
  };
}

function crearMascota(tipo) {
  return `
    <div class="mascota ${tipo}">
      ${tipo === "robot" ? "🤖" : "🐾"}
    </div>
  `;
}

function mostrarMensaje(tipo) {
  const mensajes =
    tipo === "robot"
      ? ["Modo asistente activo 🤖", "Estoy contigo siempre"]
      : ["¡Buen trabajo!", "Sigue así 💪"];

  alert(mensajes[Math.floor(Math.random() * mensajes.length)]);
}

function mostrarMascotaGrande(tipo) {
  const overlay = document.getElementById("giftOverlay");

  overlay.innerHTML = `
    <div class="mascota-grande">
      ${tipo === "robot" ? "🤖" : "🐾"}
      <p>¡Ponme un nombre!</p>
    </div>
  `;
}
