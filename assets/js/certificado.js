import { obtenerRanking } from "./ranking.js";

const nombre = localStorage.getItem("nombre");
const puntaje = localStorage.getItem("puntaje");

document.getElementById("nombre").textContent = nombre;

async function cargarRanking() {
  const datos = await obtenerRanking();
  const cont = document.getElementById("ranking");

  cont.innerHTML = `
    <h3> Ranking</h3>
    ${datos
      .map((p, i) => `<p>#${i + 1} ${p.nombre} - ${p.puntaje} pts</p>`)
      .join("")}
  `;
}

cargarRanking();

document.getElementById("downloadBtn").onclick = () => {
  const contenido = `
    Certificado DEI

    Nombre: ${nombre}
    Puntaje: ${puntaje} pts

    Felicitaciones por completar la trivia
  `;

  const blob = new Blob([contenido], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "certificado.txt";
  a.click();
};

window.volver = () => {
  window.location.href = "../../index.html";
};
