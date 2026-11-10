document.querySelectorAll('.carousel').forEach((gallery) => {
  const track = gallery.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const controls = gallery.querySelector('.carousel-controls');
  const dots = Array.from(gallery.querySelectorAll('[data-slide]'));
  let current = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const go = (index) => {
    const next = (index + slides.length) % slides.length;
    track.scrollTo({left: slides[next].offsetLeft - slides[0].offsetLeft, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  };
  const update = () => {
    const width = track.clientWidth;
    if (!width) return;
    current = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / width)));
    dots.forEach((dot, index) => dot.setAttribute('aria-pressed', String(index === current)));
    const count = gallery.querySelector('.carousel-count');
    const label = `${current + 1} / ${slides.length}`;
    if (count.textContent !== label) count.textContent = label;
  };
  controls.hidden = false;
  controls.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-slide')) go(Number(button.dataset.slide));
    else go(current + Number(button.dataset.direction));
  });
  track.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    go(current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  track.addEventListener('scroll', update, {passive: true});
  window.addEventListener('resize', () => {go(current); update();});
});
