document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (!slides.length) return;

  let index = 0;
  let interval;

  function showSlide(i) {
    slides.forEach((s) => s.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));

    slides[i].classList.add("active");
    if (dots[i]) dots[i].classList.add("active");

    index = i;
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function start() {
    interval = setInterval(nextSlide, 4000);
  }

  function reset(i) {
    clearInterval(interval);
    showSlide(i);
    start();
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => reset(i));
  });

  showSlide(0);
  start();
});
