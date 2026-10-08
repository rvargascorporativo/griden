(() => {
  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('#mobile-nav');
  const closeMenu = () => { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú'); };
  menuButton.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); menuButton.focus(); } });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
  document.querySelector('#year').textContent = new Date().getFullYear();
  const carousel = document.querySelector('.hero');
  const track = carousel.querySelector('.carousel-track');
  const slides = [...track.children];
  const dots = [...carousel.querySelectorAll('[data-slide]')];
  const pauseButton = carousel.querySelector('.pause');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer = null, paused = motion.matches, pointerInside = false, focusInside = false;
  function show(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, i) => { slide.inert = i !== current; slide.setAttribute('aria-hidden', String(i !== current)); });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
    carousel.querySelector('.slide-count').textContent = `0${current + 1} / 0${slides.length}`;
  }
  function schedule() {
    clearInterval(timer);
    timer = null;
    if (!paused && !document.hidden && !pointerInside && !focusInside) timer = setInterval(() => show(current + 1), 5000);
  }
  function reflectPause() {
    pauseButton.textContent = paused ? '▶' : 'Ⅱ';
    pauseButton.setAttribute('aria-label', paused ? 'Reanudar carrusel' : 'Pausar carrusel');
    pauseButton.setAttribute('aria-pressed', String(paused));
    // Automatic changes are quiet; manual navigation is announced when autoplay is paused.
    carousel.querySelector('.slide-count').setAttribute('aria-live', paused || focusInside ? 'polite' : 'off');
  }
  pauseButton.addEventListener('click', () => { paused = !paused; reflectPause(); schedule(); });
  carousel.querySelector('.previous').addEventListener('click', () => { show(current - 1); schedule(); });
  carousel.querySelector('.next').addEventListener('click', () => { show(current + 1); schedule(); });
  dots.forEach(dot => dot.addEventListener('click', () => { show(Number(dot.dataset.slide)); schedule(); }));
  carousel.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { pointerInside = true; schedule(); } });
  carousel.addEventListener('pointerleave', () => { pointerInside = false; schedule(); });
  carousel.addEventListener('focusin', () => { focusInside = true; reflectPause(); schedule(); });
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) { focusInside = false; reflectPause(); schedule(); } });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; reflectPause(); schedule(); });
  let touchStart = null;
  carousel.addEventListener('touchstart', event => { touchStart = event.touches[0].clientX; }, {passive:true});
  carousel.addEventListener('touchend', event => {
    if (touchStart !== null && Math.abs(event.changedTouches[0].clientX - touchStart) > 60) {
      show(current + (event.changedTouches[0].clientX < touchStart ? 1 : -1)); schedule();
    }
    touchStart = null;
  }, {passive:true});
  show(0); reflectPause(); schedule();
})();
