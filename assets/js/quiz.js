import { mostrarResultado } from "./puntaje.js";

/* =========================
   ELEMENTOS DEL DOM
========================= */
const questionEl = document.getElementById("question");
const imageEl = document.getElementById("image");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const pointsEl = document.getElementById("points");
const currentEl = document.getElementById("current");
const progressEl = document.getElementById("progress");
const feedbackEl = document.getElementById("feedback");

/* =========================
   VARIABLES
========================= */
let indice = 0;
let puntaje = 0;

/* =========================
   PREGUNTAS (DEI)
========================= */
const preguntas = [
  {
    pregunta: "¿Qué significa DEI en el entorno laboral?",
    imagen: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    opciones: [
      "Desarrollo, Estrategia e Innovación",
      "Diversidad, Equidad e Inclusión",
      "Dirección, Evaluación e Impacto",
      "Dinámica Empresarial Integral",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es una acción inclusiva en el trabajo?",
    imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    opciones: [
      "Ignorar a nuevos compañeros",
      "Asignar tareas sin explicación",
      "Presentar y apoyar a nuevos integrantes",
      "Evitar trabajar en equipo",
    ],
    correcta: 2,
  },
  {
    pregunta: "¿Qué promueve la diversidad?",
    imagen: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    opciones: [
      "Que todos piensen igual",
      "La inclusión de diferentes perspectivas",
      "Eliminar diferencias",
      "Evitar conflictos",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué es la equidad?",
    imagen: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    opciones: [
      "Dar lo mismo a todos",
      "Ignorar necesidades individuales",
      "Dar a cada persona lo que necesita",
      "Tratar a todos de forma idéntica",
    ],
    correcta: 2,
  },
  {
    pregunta: "¿Qué es la inclusión?",
    imagen: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    opciones: [
      "Excluir a quienes son diferentes",
      "Crear espacios donde todos participen",
      "Trabajar solo con iguales",
      "Evitar opiniones distintas",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué actitud fomenta un ambiente inclusivo?",
    imagen: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    opciones: [
      "Escuchar y respetar opiniones",
      "Imponer ideas",
      "Ignorar diferencias",
      "Criticar constantemente",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Por qué es importante la DEI?",
    imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    opciones: [
      "Reduce la productividad",
      "Mejora la colaboración y creatividad",
      "Genera conflictos",
      "Limita ideas",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué acción NO es inclusiva?",
    imagen: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    opciones: [
      "Respetar opiniones",
      "Discriminar a compañeros",
      "Escuchar activamente",
      "Apoyar al equipo",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Cómo puedes apoyar la diversidad?",
    imagen: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    opciones: [
      "Ignorando diferencias",
      "Promoviendo respeto",
      "Evitando interacción",
      "Trabajando solo",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué beneficio trae la inclusión?",
    imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    opciones: [
      "Menos innovación",
      "Ambiente laboral negativo",
      "Mayor compromiso del equipo",
      "Menor productividad",
    ],
    correcta: 2,
  },
];

function cargarPregunta() {
  const actual = preguntas[indice];

  questionEl.textContent = actual.pregunta;
  imageEl.src = actual.imagen;

  currentEl.textContent = indice + 1;
  progressEl.style.width = `${((indice + 1) / preguntas.length) * 100}%`;

  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

  actual.opciones.forEach((opcion, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.classList.add("option");

    btn.onclick = () => seleccionarRespuesta(btn, i);

    optionsEl.appendChild(btn);
  });
}

function seleccionarRespuesta(boton, index) {
  const correcta = preguntas[indice].correcta;
  const botones = document.querySelectorAll(".option");

  botones.forEach((btn) => btn.classList.add("disabled"));

  if (index === correcta) {
    boton.classList.add("correct");
    puntaje += 10;
    feedbackEl.textContent = "+10 pts 🎉";
  } else {
    boton.classList.add("wrong");
    botones[correcta].classList.add("correct");
    feedbackEl.textContent = "Respuesta incorrecta ";
  }

  pointsEl.textContent = `${puntaje} pts`;
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  indice++;

  if (indice < preguntas.length) {
    cargarPregunta();
  } else {
    mostrarResultado(puntaje);
  }
};

cargarPregunta();
