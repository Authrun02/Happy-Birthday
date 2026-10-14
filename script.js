(function () {
  var env = document.getElementById('env');
  var scene = document.getElementById('scene');
  var letter = document.getElementById('letter');
  var title = document.getElementById('title');
  var hint = document.getElementById('hint');
  var fx = document.getElementById('fx');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ready = false;
  var read = false;

  // twinkling background stars
  for (var i = 0; i < 22; i++) {
    var s = document.createElement('i');
    var z = 6 + Math.random() * 10;
    s.className = 'spark';
    s.style.cssText = 'left:' + Math.random() * 100 + '%;top:' + Math.random() * 100 + '%;width:' + z + 'px;height:' + z + 'px;' +
      'animation-delay:' + (-Math.random() * 3) + 's;animation-duration:' + (2.5 + Math.random() * 3) + 's';
    fx.appendChild(s);
  }

  // confetti burst when the letter opens
  function confetti() {
    if (reduce) return;
    var colors = ['#8A5BC8', '#C9A8EE', '#F2B8E0', '#E58AC6', '#F5D98B', '#FFFFFF'];
    var box = document.createElement('div');
    for (var i = 0; i < 60; i++) {
      var c = document.createElement('i');
      c.className = 'conf';
      c.style.cssText = 'left:' + Math.random() * 100 + '%;background:' + colors[i % colors.length] + ';' +
        'animation-duration:' + (2.8 + Math.random() * 2.2) + 's;animation-delay:' + Math.random() * 0.8 + 's;' +
        '--dx:' + (Math.random() * 160 - 80) + 'px;--rot:' + (360 + Math.random() * 720) + 'deg';
      box.appendChild(c);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 6500);
  }

  function showLetter() {
    if (!ready || read) return;
    read = true;
    env.setAttribute('aria-expanded', 'true');
    scene.classList.add('gone');
    letter.hidden = false;
    void letter.offsetWidth;
    letter.classList.add('show');
    letter.focus({ preventScroll: true });
    confetti();
    setTimeout(function () { scene.hidden = true; }, reduce ? 0 : 650);
  }

  env.addEventListener('click', function (e) {
    if (!env.classList.contains('open')) {
      env.classList.add('open');
      title.classList.add('hide');
      hint.classList.add('hide');
      setTimeout(function () {
        ready = true;
        env.setAttribute('aria-label', 'Read your birthday letter');
        hint.textContent = 'Now tap the letter to read it';
        hint.classList.remove('hide');
      }, reduce ? 0 : 1300);
      return;
    }
    if (e.target.closest('.paper') || e.detail === 0) showLetter();
  });
})();