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
  window.closeMobileMenu = closeMenu;
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
      const items = [...menu.querySelectorAll('a,button')].filter(el => !el.hidden && el.getClientRects().length > 0);
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
  carousel.querySelector('.previous')?.addEventListener('click', () => { show(current - 1); schedule(); });
  carousel.querySelector('.next')?.addEventListener('click', () => { show(current + 1); schedule(); });
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

/* Catalogue filters and accessible product preview. */
(() => {
  function attachFilters(attribute, cardSelector, onUpdate) {
    const buttons = [...document.querySelectorAll(`[${attribute}]`)];
    const cards = [...document.querySelectorAll(cardSelector)];
    buttons.forEach(button => button.addEventListener('click', () => {
      const value = button.getAttribute(attribute);
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      cards.forEach(card => { card.hidden = value !== 'all' && card.dataset.category !== value; });
      onUpdate?.(cards.filter(card => !card.hidden).length);
    }));
  }
  attachFilters('data-product-filter', '.product', count => {
    document.querySelector('#product-count').textContent = `${count} ${count === 1 ? 'modelo' : 'modelos'}`;
  });
  attachFilters('data-presale-filter', '.presale-card');
  const dialog = document.querySelector('#quick-view-dialog');
  const modelElement = document.querySelector('#store-models');
  if (!dialog || !modelElement) return;
  const models = JSON.parse(modelElement.textContent);
  const image = dialog.querySelector('#quick-image');
  const thumbs = dialog.querySelector('#quick-thumbnails');
  let opener = null;
  let oldOverflow = '';
  function selectImage(model, index) {
    image.src = model.images[index];
    image.alt = `${model.name}, vista ${index + 1}`;
    [...thumbs.children].forEach((button, i) => button.setAttribute('aria-pressed', String(index === i)));
  }
  document.querySelectorAll('[data-quick-view]').forEach(button => {
    button.addEventListener('click', () => {
      const model = models[button.dataset.quickView];
      if (!model) return;
      opener = button;
      for (const [id, value] of Object.entries({
        'quick-title': model.name, 'quick-caption': model.caption,
        'quick-price': model.price, 'quick-note': model.note, 'quick-specs': model.specs
      })) dialog.querySelector(`#${id}`).textContent = value;
      dialog.querySelector('#quick-consult').href = model.whatsapp;
      dialog.querySelector('#quick-details').href = model.url;
      thumbs.replaceChildren();
      model.images.forEach((src, index) => {
        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.setAttribute('aria-label', `Ver ${model.name}, vista ${index + 1}`);
        const thumbnail = document.createElement('img');
        thumbnail.src = src; thumbnail.alt = ''; thumbnail.loading = 'lazy';
        thumb.append(thumbnail);
        thumb.addEventListener('click', () => selectImage(model, index));
        thumbs.append(thumb);
      });
      selectImage(model, 0);
      oldOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      dialog.querySelector('.quick-close').focus();
    });
  });
  dialog.querySelector('.quick-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = oldOverflow;
    opener?.focus();
  });
})();
