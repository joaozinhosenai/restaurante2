document.getElementById("form-contato").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Mensagem enviada com sucesso!");
});
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;
let slideInterval = null;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
const carouselInner = document.getElementById('carouselInner');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === index);
  });
  currentIndex = index;
}

function nextSlide() {
  let nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}

function prevSlide() {
  let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

indicators.forEach((ind) => {
  ind.addEventListener('click', () => {
    let index = parseInt(ind.getAttribute('data-slide'));
    showSlide(index);
    resetInterval();
  });
});

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

// Drag functions

carouselInner.addEventListener('mousedown', dragStart);
carouselInner.addEventListener('touchstart', dragStart);

carouselInner.addEventListener('mouseup', dragEnd);
carouselInner.addEventListener('touchend', dragEnd);

carouselInner.addEventListener('mouseleave', dragEnd);

carouselInner.addEventListener('mousemove', dragMove);
carouselInner.addEventListener('touchmove', dragMove);

function dragStart(event) {
  isDragging = true;
  startX = getPositionX(event);
  carouselInner.style.cursor = 'grabbing';
  clearInterval(slideInterval);
}

function dragMove(event) {
  if (!isDragging) return;
  const currentPosition = getPositionX(event);
  const movedBy = currentPosition - startX;

  if (movedBy > 100) {
    prevSlide();
    dragEnd();
  } else if (movedBy < -100) {
    nextSlide();
    dragEnd();
  }
}

function dragEnd() {
  isDragging = false;
  carouselInner.style.cursor = 'grab';
  resetInterval();
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Inicializa
showSlide(0);
resetInterval();