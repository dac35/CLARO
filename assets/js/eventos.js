// ===============================
// MODAL MEJORADO
// ===============================
function abrirModal(titulo) {
  const modal = document.getElementById("modal");
  const tituloEvento = document.getElementById("tituloEvento");

  tituloEvento.innerText = titulo;

  modal.style.display = "block";
  modal.style.opacity = "0";

  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.style.opacity = "0";

  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// ===============================
// INSCRIPCIÓN MEJORADA
// ===============================
function inscribirse() {
  const nombre = document.getElementById("nombre").value;
  const mensaje = document.getElementById("mensaje");

  if (nombre === "") {
    mensaje.innerText = "⚠️ Ingresa tu nombre";
    mensaje.style.color = "red";
    return;
  }

  mensaje.innerText = "🎉 Registro exitoso. Bienvenido al cambio.";
  mensaje.style.color = "green";
}

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
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      updateCounter();
      observer.disconnect();
    }
  });

  observer.observe(counter);
});

// ===============================
// ANIMACIÓN AL HACER SCROLL 🔥
// ===============================
const elements = document.querySelectorAll(
  ".evento-card, .beneficio, .stat-card",
);

const observer = new IntersectionObserver((entries) => {
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

  observer.observe(el);
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
