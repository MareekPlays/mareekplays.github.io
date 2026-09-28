(() => {
  document.querySelectorAll('[data-news-slider]').forEach((slider) => {
    const track = slider.querySelector('.news-slider-track');
    const cards = [...track.querySelectorAll('.news-card')];
    const dots = slider.querySelector('[data-news-dots]');
    const previous = slider.querySelector('[data-news-prev]');
    const next = slider.querySelector('[data-news-next]');
    let current = 0;

    cards.forEach((card, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'news-slider-dot';
      dot.setAttribute('aria-label', `Show news ${index + 1}`);
      dot.addEventListener('click', () => goTo(index));
      dots.append(dot);
    });

    const visibleCards = () => window.matchMedia('(max-width: 800px)').matches ? 1 : 2;
    const maxIndex = () => Math.max(0, cards.length - visibleCards());

    function updateDots() {
      [...dots.children].forEach((dot, index) => dot.classList.toggle('is-active', index === current));
    }

    function goTo(index) {
      current = Math.min(Math.max(index, 0), maxIndex());
      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      track.scrollTo({ left: current * (cardWidth + gap), behavior: 'smooth' });
      updateDots();
    }

    previous.addEventListener('click', () => goTo(current === 0 ? maxIndex() : current - 1));
    next.addEventListener('click', () => goTo(current === maxIndex() ? 0 : current + 1));
    track.addEventListener('scroll', () => {
      if (window.matchMedia('(max-width: 800px)').matches) {
        const width = cards[0].getBoundingClientRect().width;
        current = Math.round(track.scrollLeft / width);
        updateDots();
      }
    }, { passive: true });
    window.addEventListener('resize', () => { current = Math.min(current, maxIndex()); updateDots(); });
    updateDots();
  });
})();
