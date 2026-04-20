window.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("nombre");
  const puntaje = Number(localStorage.getItem("puntajeFinal"));
  const tiempo = localStorage.getItem("tiempoFinal");
  const pasoJuego2 = localStorage.getItem("pasoJuego2");

  if (!nombre) {
    window.location.href = "trivia.html";
    return;
  }

  if (puntaje < 80 && !pasoJuego2) {
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

  setTimeout(() => {
    document.querySelector(".diploma-inner").classList.add("animar");
  }, 100);
});

document.getElementById("downloadBtn").addEventListener("click", async () => {
  const element = document.querySelector(".diploma-inner");
  const nombre = localStorage.getItem("nombre") || "usuario";

  element.style.opacity = "1";
  element.style.transform = "none";

  await new Promise((resolve) => setTimeout(resolve, 300));

  html2pdf()
    .set({
      filename: `certificado-${nombre}.pdf`,
      margin: 10,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "landscape",
      },
    })
    .from(element)
    .save();
});

window.reintentar = () => {
  localStorage.removeItem("puntajeFinal");
  localStorage.removeItem("tiempoFinal");
  window.location.href = "trivia.html";
};

window.cerrarSesion = () => {
  localStorage.removeItem("nombre");
  window.location.href = "trivia.html";
};
