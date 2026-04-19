import { db } from "./firebase.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function guardarPuntaje(nombre, puntaje, correctas, tiempo) {
  await addDoc(collection(db, "puntajes"), {
    nombre,
    puntaje,
    correctas,
    tiempo,
    fecha: new Date(),
  });
}

export async function mostrarResultado(puntaje, correctas, tiempo) {
  let nombre = localStorage.getItem("nombre");

  if (!nombre) {
    nombre = prompt("Ingresa tu nombre:");
  }

  if (!nombre) return;

  await guardarPuntaje(nombre, puntaje, correctas, tiempo);

  // guardar para mostrar luego
  localStorage.setItem("puntaje", puntaje);
  localStorage.setItem("correctas", correctas);
  localStorage.setItem("tiempo", tiempo);

  window.location.href = "../html/index.html"; // vuelve al inicio
}
