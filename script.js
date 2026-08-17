// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Contact form — submits to Formspree (no backend needed)
const form = document.querySelector('#contact-form');
const formCard = document.querySelector('.form-card');
if (form && formCard) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.form-submit');
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = '전송 중...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        const successEl = formCard.querySelector('.form-success');
        form.style.display = 'none';
        successEl.classList.add('show');
      } else {
        submitBtn.textContent = '전송 실패 — 다시 시도해주세요';
        submitBtn.disabled = false;
        setTimeout(() => { submitBtn.textContent = originalLabel; }, 2500);
      }
    } catch (err) {
      submitBtn.textContent = '전송 실패 — 다시 시도해주세요';
      submitBtn.disabled = false;
      setTimeout(() => { submitBtn.textContent = originalLabel; }, 2500);
    }
  });
}

// Animated bar charts in the Data section — fill from 0 to target % on scroll-in
const chartFills = document.querySelectorAll('.chart-fill');
if (chartFills.length && 'IntersectionObserver' in window) {
  const chartIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.getAttribute('data-value') || '0';
        requestAnimationFrame(() => { entry.target.style.width = target + '%'; });
        chartIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  chartFills.forEach(el => chartIO.observe(el));
}

// Tap-to-toggle source tooltip on touch devices
document.querySelectorAll('.chart-row .info-dot').forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.stopPropagation();
    const row = dot.closest('.chart-row');
    document.querySelectorAll('.chart-row.tip-open').forEach(r => { if (r !== row) r.classList.remove('tip-open'); });
    row.classList.toggle('tip-open');
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.chart-row.tip-open').forEach(r => r.classList.remove('tip-open'));
});

// Reveal-on-scroll for section heads and cards
const revealTargets = document.querySelectorAll('.section-head, .pipe-step, .why-item, .step, .proof-card, .stat-box, .data-card, .data-stat, .addon-card');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });
}
