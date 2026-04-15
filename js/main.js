// Rewritr — shared site JS

(function () {
  'use strict';

  // ── Active nav link ────────────────────────────────────
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (path === href || (href !== '/' && path.startsWith(href))) {
      a.classList.add('active');
    }
  });

  // ── Mobile nav toggle ──────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', open);
    });
  }

  // ── Scroll-reveal ──────────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(el => obs.observe(el));
  }

  // ── Smooth copy code blocks ────────────────────────────
  document.querySelectorAll('pre code').forEach(block => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(block.textContent).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 2000);
      });
    });
    const pre = block.closest('pre');
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });

})();
