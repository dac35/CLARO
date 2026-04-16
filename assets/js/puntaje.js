import { db } from "./firebase.js";
import { obtenerRanking } from "./ranking.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function guardarPuntaje(nombre, puntaje) {
  await addDoc(collection(db, "puntajes"), {
    nombre,
    puntaje,
    fecha: new Date(),
  });
}

async function mostrarRanking() {
  const datos = await obtenerRanking();

  const cont = document.getElementById("ranking");

  cont.innerHTML = `
    <h2>🏆 Ranking</h2>
    ${datos
      .map(
        (p, i) => `
      <p>#${i + 1} ${p.nombre} - ${p.puntaje}</p>
    `,
      )
      .join("")}
  `;
}

export async function mostrarResultado(puntaje) {
  const nombre = prompt("Ingresa tu nombre:");

  if (!nombre) return;

  await guardarPuntaje(nombre, puntaje);
  await mostrarRanking();
}
