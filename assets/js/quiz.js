import { guardarResultado } from "./ranking.js";

let current = 0;
let score = 0;
let correctCount = 0;
let time = 10;
let interval;
let answered = false;
let startTime = 0;
let puntosPorPregunta = 10;
let correctSound;
let wrongSound;

const questions = [
  {
    question: "¿Qué significa DEI?",
    options: [
      "Diversidad, Equidad e Inclusión",
      "Desarrollo, Educación e Innovación",
      "Derechos, Ética e Igualdad",
      "Datos, Estrategia e Impacto",
    ],
    answer: "Diversidad, Equidad e Inclusión",
  },
  {
    question: "¿Qué busca la diversidad?",
    options: [
      "Eliminar diferencias",
      "Valorar las diferencias entre personas",
      "Hacer a todos iguales",
      "Ignorar las culturas",
    ],
    answer: "Valorar las diferencias entre personas",
  },
  {
    question: "¿Qué significa equidad?",
    options: [
      "Dar lo mismo a todos",
      "Dar ventajas a algunos",
      "Dar oportunidades justas según necesidades",
      "Ignorar las diferencias",
    ],
    answer: "Dar oportunidades justas según necesidades",
  },
  {
    question: "¿Qué promueve la inclusión?",
    options: [
      "Excluir a personas diferentes",
      "Crear espacios donde todos se sientan parte",
      "Trabajar solo con iguales",
      "Evitar la participación",
    ],
    answer: "Crear espacios donde todos se sientan parte",
  },
  {
    question: "¿Por qué es importante la DEI en el trabajo?",
    options: [
      "Para evitar trabajar",
      "Para crear ambientes más justos y colaborativos",
      "Para reducir equipos",
      "Para limitar ideas",
    ],
    answer: "Para crear ambientes más justos y colaborativos",
  },
  {
    question: "¿Qué implica la inclusión en un equipo?",
    options: [
      "Escuchar y respetar a todos",
      "Ignorar opiniones",
      "Solo aceptar una idea",
      "Excluir a algunos",
    ],
    answer: "Escuchar y respetar a todos",
  },
  {
    question: "¿La diversidad incluye qué aspecto?",
    options: [
      "Solo edad",
      "Solo género",
      "Diferencias como cultura, género y pensamiento",
      "Solo nacionalidad",
    ],
    answer: "Diferencias como cultura, género y pensamiento",
  },
  {
    question: "¿Qué pasa cuando aplicamos DEI?",
    options: [
      "Hay menos respeto",
      "Se crean ambientes negativos",
      "Se generan espacios más humanos y colaborativos",
      "Se eliminan oportunidades",
    ],
    answer: "Se generan espacios más humanos y colaborativos",
  },
  {
    question: "¿Qué acción refleja equidad?",
    options: [
      "Dar lo mismo a todos",
      "Ignorar necesidades",
      "Apoyar según lo que cada persona necesita",
      "Excluir a algunos",
    ],
    answer: "Apoyar según lo que cada persona necesita",
  },
  {
    question: "¿Qué busca esta trivia?",
    options: [
      "Confundir al usuario",
      "Evaluar conocimientos sobre inclusión",
      "Eliminar ideas",
      "Reducir participación",
    ],
    answer: "Evaluar conocimientos sobre inclusión",
  },
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

const currentEl = document.getElementById("current");
const totalEl = document.getElementById("total");

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
  correctSound = document.getElementById("correctSound");
  wrongSound = document.getElementById("wrongSound");

  totalEl.textContent = questions.length;

  const nombre = localStorage.getItem("nombre");
  const terminado = localStorage.getItem("quizTerminado");
  const puntaje = Number(localStorage.getItem("puntajeFinal"));

  if (nombre) {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    startTime = Date.now();
    loadQuestion();
  }

  if (terminado === "true" && puntaje >= 80) {
    window.location.href = "certificado.html";
  }

  if (terminado === "true" && puntaje < 80) {
    window.location.href = "juego2.html";
  }
});

startBtn.addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;

  if (!name || !email) return;

  localStorage.setItem("nombre", name);
  localStorage.setItem("email", email);

  document.getElementById("startScreen").style.display = "none";
  document.body.classList.add("quiz-active");

  startTime = Date.now();
  loadQuestion();
});

function startTimer() {
  clearInterval(interval);
  time = 10;
  timerEl.textContent = `⏱ ${time}`;

  interval = setInterval(() => {
    time--;
    timerEl.textContent = `⏱ ${time}`;

    if (time <= 0) {
      clearInterval(interval);
      nextQuestion();
    }
  }, 1000);
}

function loadQuestion() {
  answered = false;

  currentEl.textContent = current + 1;

  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function checkAnswer(selected) {
  if (answered) return;

  answered = true;
  clearInterval(interval);

  if (selected === questions[current].answer) {
    score += 10;
    correctCount++;
    correctSound.play();
  } else {
    wrongSound.play();
  }

  scoreEl.textContent = `⭐ ${score}`;

  setTimeout(nextQuestion, 800);
}

function nextQuestion() {
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

async function endGame() {
  const totalTime = Math.floor((Date.now() - startTime) / 1000);

  localStorage.setItem("quizTerminado", "true");
  localStorage.setItem("puntajeFinal", score);
  localStorage.setItem("tiempoFinal", totalTime);

  const nombre = localStorage.getItem("nombre");
  const email = localStorage.getItem("email");

  await guardarResultado({
    nombre,
    email,
    puntaje: score,
    correctas: correctCount,
    tiempo: totalTime,
    fecha: new Date().toISOString(),
  });

  if (score >= 80) {
    window.location.href = "certificado.html";
  } else {
    window.location.href = "juego2.html";
  }
}
