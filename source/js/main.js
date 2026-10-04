/* ============================================================
   Xongyi theme — main.js
   Developer: XFM | https://www.lovou.pw
   ============================================================ */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;

  /* ---------- 暗色模式 ---------- */
  var themeToggle = doc.getElementById('theme-toggle');
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('xongyi-theme', t); } catch (e) {}
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- 移动端菜单 ---------- */
  var navToggle = doc.getElementById('nav-toggle');
  var siteNav = doc.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // 点击菜单项后自动收起
    siteNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        siteNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 顶栏滚动状态 ---------- */
  var header = doc.getElementById('header');
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- 返回顶部 ---------- */
  var backTop = doc.getElementById('back-to-top');
  if (backTop) {
    var onScrollTop = function () {
      backTop.classList.toggle('is-visible', window.scrollY > 480);
    };
    window.addEventListener('scroll', onScrollTop, { passive: true });
    onScrollTop();
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 滚动淡入动画 ---------- */
  var reveals = Array.prototype.slice.call(doc.querySelectorAll('.reveal'));
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---------- 数字滚动动画 ---------- */
  var counters = Array.prototype.slice.call(doc.querySelectorAll('.stat__number[data-count]'));
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var decimals = (String(target).split('.')[1] || '').length;
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------- 当前年份兜底 ---------- */
  var yearEl = doc.querySelector('.footer-copyright');
  if (yearEl && yearEl.textContent.indexOf('2026') === -1) {
    yearEl.textContent = yearEl.textContent.replace(/©\s*\d{4}/, '© ' + new Date().getFullYear());
  }
})();
