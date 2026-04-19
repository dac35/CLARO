window.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("nombre");
  const puntaje = Number(localStorage.getItem("puntajeFinal"));
  const tiempo = localStorage.getItem("tiempoFinal");
  const pasoJuego2 = localStorage.getItem("pasoJuego2");

  if (puntaje < 80 && !pasoJuego2) {
    window.location.href = "trivia.html";
    return;
  }
  console.log("Puntaje:", puntaje);

  if (!nombre) {
    window.location.href = "trivia.html";
    return;
  }

  if (puntaje < 80) {
    document.querySelector(".diploma-inner").innerHTML = `
      <h2>😕 Aún no alcanzas el certificado</h2>
      <p>Necesitas mínimo <strong>80 puntos</strong></p>
      <p>Tu puntaje: <strong>${puntaje}</strong></p>

      <button onclick="reintentar()">Intentar de nuevo</button>
    `;
    return;
  }

  document.getElementById("certNombre").textContent = nombre;
  document.getElementById("certPuntaje").textContent = puntaje;
  document.getElementById("certTiempo").textContent = tiempo;

  const cert = document.querySelector(".diploma-inner");
  setTimeout(() => {
    cert.classList.add("animar");
  }, 100);
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const element = document.getElementById("certificado");
  const nombre = localStorage.getItem("nombre");

  html2pdf()
    .set({
      filename: `certificado-${nombre}.pdf`,
      html2canvas: { scale: 2 },
    })
    .from(element)
    .save();
});

window.reintentar = () => {
  localStorage.removeItem("quizTerminado");
  localStorage.removeItem("puntajeFinal");
  localStorage.removeItem("tiempoFinal");

  window.location.href = "trivia.html";
};

window.cerrarSesion = () => {
  localStorage.clear();
  window.location.href = "trivia.html";
};
