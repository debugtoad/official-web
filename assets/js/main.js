/* DebugToad — main-website
   Small progressive enhancements. The page is fully readable without JS. */
(function () {
  'use strict';

  /* --- Sticky header gets a hairline once the page scrolls ---------------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Mobile nav -------------------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');

  if (toggle && nav) {
    var mq = window.matchMedia('(max-width: 719px)');

    var sync = function () {
      // Above the breakpoint the nav is always visible; below, CSS hides it
      // until `is-open` is set, so there is no open-then-close flash on load.
      if (mq.matches) {
        nav.classList.toggle('is-open', toggle.getAttribute('aria-expanded') === 'true');
      } else {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    };

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      sync();
    });

    nav.addEventListener('click', function (e) {
      if (mq.matches && e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        sync();
      }
    });

    (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(sync);
    sync();
  }

  /* --- Image slots: show the labelled outline if an image is missing ------ */
  document.querySelectorAll('.slot > img').forEach(function (img) {
    var fail = function () { img.parentElement.classList.add('is-missing'); img.remove(); };
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* --- Footer year -------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
