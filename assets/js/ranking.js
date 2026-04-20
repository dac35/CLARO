import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function guardarResultado(data) {
  await addDoc(collection(db, "puntajes"), data);
}

export async function obtenerRanking() {
  const q = query(
    collection(db, "puntajes"),
    orderBy("puntaje", "desc"),
    limit(10),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}

function crearModal() {
  const modal = document.createElement("div");
  modal.id = "modal-ranking";
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close">&times;</button>
      <div id="modal-body"></div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".close").onclick = () => {
    modal.classList.remove("show");
  };

  return modal;
}

const modal = crearModal();

function abrirModal(data, posicion) {
  const medal = posicion === 0 ? "🥇" : posicion === 1 ? "🥈" : "🥉";

  modal.querySelector("#modal-body").innerHTML = `
    <div class="modal-medal">${medal}</div>
    <h2>${data.nombre}</h2>
    <p><b>Puntaje:</b> ${data.puntaje} pts</p>
    <p><b>Correctas:</b> ${data.correctas || 0}</p>
    <p><b>Tiempo:</b> ${data.tiempo || 0}s</p>
  `;

  modal.classList.add("show");
}

export async function mostrarRanking() {
  const cont = document.getElementById("podium");
  if (!cont) return;

  const datos = await obtenerRanking();
  cont.innerHTML = "";

  const top5 = datos.slice(0, 5);

  top5.forEach((p, i) => {
    const card = document.createElement("div");

    const position = i + 1;

    const medal =
      position === 1
        ? "🥇"
        : position === 2
          ? "🥈"
          : position === 3
            ? "🥉"
            : "";

    card.className = `podium-card podium-${position}`;

    card.innerHTML = `
      <div class="podium-position">${medal ? medal : `#${position}`}</div>
      <div class="podium-name">${p.nombre}</div>
      <div class="podium-score">${p.puntaje} pts</div>
    `;

    card.style.animationDelay = `${i * 0.15}s`;

    cont.appendChild(card);
  });
}

mostrarRanking();
