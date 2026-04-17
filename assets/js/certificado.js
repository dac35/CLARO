import { obtenerRanking } from "./ranking.js";

const nombre = localStorage.getItem("nombre") || "Usuario";
const puntaje = localStorage.getItem("puntaje") || "0";

document.getElementById("nombre").textContent = nombre;
document.getElementById("puntaje").textContent = puntaje;
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
document.getElementById("downloadBtn").addEventListener("click", () => {
  const element = document.getElementById("certificado");

  html2pdf()
    .set({
      margin: 10,
      filename: `certificado-${nombre}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    })
    .from(element)
    .save();
});
window.volver = () => {
  window.location.href = "../../index.html";
};
