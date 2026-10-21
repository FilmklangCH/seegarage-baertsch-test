(function () {
  var btn = document.querySelector('.menu-btn');
  var list = document.querySelector('.nav ul');
  if (btn && list) {
    btn.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Karte und Fahrzeugliste laden erst nach Klick (Daten gehen sonst an Google bzw. AutoScout24)
  var mapBtn = document.querySelector('[data-load-map]');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var box = mapBtn.closest('.map');
      var f = document.createElement('iframe');
      f.src = 'https://www.google.com/maps?q=St.+Gallerstrasse+41A,+9325+Roggwil+TG&output=embed';
      f.title = 'Karte: Bärtsch Seegarage, St. Gallerstrasse 41A, Roggwil TG';
      f.loading = 'lazy';
      box.innerHTML = '';
      box.appendChild(f);
    });
  }

  // Bildslider im Hero
  var slider = document.querySelector('.hero3-slider');
  if (slider && slider.querySelector('.prev')) {
    var slides = slider.querySelectorAll('.slide'), dots = slider.querySelectorAll('.dot');
    var cur = 0, timer = null;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === cur); });
      dots.forEach(function (d, k) { d.classList.toggle('on', k === cur); d.setAttribute('aria-current', k === cur ? 'true' : 'false'); });
    }
    function play() { if (reduce || timer) return; timer = setInterval(function () { show(cur + 1); }, 5500); }
    function stop() { clearInterval(timer); timer = null; }
    slider.querySelector('.prev').addEventListener('click', function () { show(cur - 1); stop(); });
    slider.querySelector('.next').addEventListener('click', function () { show(cur + 1); stop(); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); stop(); }); });
    slider.addEventListener('mouseenter', stop); slider.addEventListener('mouseleave', play);
    slider.addEventListener('focusin', stop);
    var sx = null;
    slider.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; stop(); }, {passive: true});
    slider.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1)); sx = null; });
    play();
  }
})();
