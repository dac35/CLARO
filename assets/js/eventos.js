// ===============================
// SCROLL SUAVE
// ===============================
function scrollEventos() {
  document.getElementById("eventos").scrollIntoView({
    behavior: "smooth",
  });
}

// ===============================
// CONTADORES ANIMADOS 🔥
// ===============================
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;

    const increment = target / 100;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  // ACTIVAR SOLO CUANDO APARECE EN PANTALLA
  const observerCounter = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      updateCounter();
      observerCounter.disconnect(); // ✅ correcto
    }
  });

  observerCounter.observe(counter); // ✅ correcto
});

// ===============================
// ANIMACIÓN AL HACER SCROLL 🔥
// ===============================
const elements = document.querySelectorAll(
  ".evento-card, .beneficio, .stat-card",
);

const observerAnimacion = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
});

elements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "all 0.6s ease";

  observerAnimacion.observe(el);
});

// ===============================
// EFECTO 3D EN TARJETAS 😎
// ===============================
const cards = document.querySelectorAll(".evento-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

// ===============================
// HEADER DINÁMICO
// ===============================
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (window.scrollY > 50) {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
  }
});

window.addEventListener("load", () => {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const update = () => {
      count += target / 50;

      if (count < target) {
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });
});

function irFormulario() {
  window.location.href = "../html/formulario.html";
}

// ===============================
// MODAL
// ===============================
function abrirModal(titulo, imgSrc) {
  const modal = document.getElementById("modal");
  const form = modal.querySelector("form");

  document.getElementById("tituloEvento").innerText = titulo;

  // 🔥 IMAGEN DINÁMICA
  document.getElementById("modal-img").src = imgSrc;

  // 🔥 LIMPIAR FORMULARIO
  form.reset();
  document.getElementById("mensaje-exito").innerText = "";

  // 🔥 CONTENIDO DINÁMICO
  if (titulo === "Comunicación inclusiva") {
    document.getElementById("descripcionEvento").innerText =
      "Aprenderás a comunicarte de forma inclusiva, evitando sesgos y promoviendo el respeto en entornos personales y laborales.";
    document.getElementById("lugarEvento").innerText = "La Victoria";
    document.getElementById("horaEvento").innerText = "10:00 AM";
  }

  if (titulo === "Historias que transforman") {
    document.getElementById("descripcionEvento").innerText =
      "Conoce historias reales que han generado impacto social y aprende cómo tú también puedes ser parte del cambio.";
    document.getElementById("lugarEvento").innerText = "Híbrido";
    document.getElementById("horaEvento").innerText = "4:00 PM";
  }

  if (titulo === "Construyamos juntos") {
    document.getElementById("descripcionEvento").innerText =
      "Participa en un espacio colaborativo donde se desarrollarán ideas para mejorar la inclusión en distintos contextos.";
    document.getElementById("lugarEvento").innerText = "Virtual";
    document.getElementById("horaEvento").innerText = "11:00 AM";
  }

  modal.style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

/* 🔥 cerrar al hacer clic fuera */
function cerrarFuera(e) {
  if (e.target.id === "modal") {
    cerrarModal();
  }
}

function enviarFormulario(e) {
  e.preventDefault();

  const mensaje = document.getElementById("mensaje-exito");

  mensaje.innerText = "✅ Inscripción exitosa. ¡Te esperamos!";
  mensaje.style.color = "green";

  // opcional: limpiar form
  e.target.reset();
}
