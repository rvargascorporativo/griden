(() => {
  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('#mobile-nav');
  const overlay = document.querySelector('#menu-overlay');
  let previousOverflow = '';
  const closeMenu = () => {
    if (!menu.hidden) document.body.style.overflow = previousOverflow;
    menu.hidden = true; if (overlay) overlay.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú');
  };
  overlay?.addEventListener('click', () => { closeMenu(); menuButton.focus(); });
  menu.querySelector('.drawer-close')?.addEventListener('click', () => { closeMenu(); menuButton.focus(); });
  menuButton.addEventListener('click', () => {
    const open = menu.hidden;
    if (open) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      menu.hidden = false; if (overlay) overlay.hidden = false;
      menu.querySelector('.drawer-close')?.focus();
    } else closeMenu();
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (menu.hidden) return;
    if (event.key === 'Escape') { closeMenu(); menuButton.focus(); }
    if (event.key === 'Tab') {
      const items = [...menu.querySelectorAll('a,button')].filter(el => el.style.display !== 'none');
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 1150) closeMenu(); });
  document.querySelector('#year').textContent = new Date().getFullYear();
  const carousel = document.querySelector('.hero');
  const track = carousel.querySelector('.carousel-track');
  const slides = [...track.children];
  const dots = [...carousel.querySelectorAll('[data-slide]')];
  const pauseButton = carousel.querySelector('.pause');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer = null, paused = motion.matches, focusInside = false;
  function fitPhoto() {
    const viewport = carousel.querySelector('.carousel-viewport');
    const height = slides[current].getBoundingClientRect?.().height;
    if (viewport && height > 0) viewport.style.height = `${height}px`;
  }
  slides.forEach(slide => slide.querySelector?.('.banner-photo')?.addEventListener('load', fitPhoto));
  window.addEventListener('resize', fitPhoto);
  function show(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    fitPhoto();
    slides.forEach((slide, i) => { slide.inert = i !== current; slide.setAttribute('aria-hidden', String(i !== current)); });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
    carousel.querySelector('.slide-count').textContent = `0${current + 1} / 0${slides.length}`;
  }
  function schedule() {
    clearInterval(timer);
    timer = null;
    if (!paused && !document.hidden && !focusInside) timer = setInterval(() => show(current + 1), 3000);
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
