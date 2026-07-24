/* ==================================================================
   ETERNAL LOVE STORY — script.js
   No external libraries needed — everything below is plain JS so the
   site keeps working even without an internet connection.
   Nothing in this file needs editing to customize the site — go to
   index.html to swap photos/videos/audio/text.
   ================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------
     0. Hero entrance sequence
     --------------------------------------------------------------- */
  const heroLines = document.querySelectorAll('.hero-title .line');
  const heroEyebrow = document.querySelector('.hero-eyebrow');
  const sealButton = document.querySelector('.seal-button');
  const scrollHint = document.querySelector('.scroll-hint');

  setTimeout(() => heroEyebrow && heroEyebrow.classList.add('in-view'), 200);
  heroLines.forEach((line, i) => {
    setTimeout(() => {
      line.style.transition = 'opacity 1s ease, transform 1s ease';
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 600 + i * 260);
  });
  setTimeout(() => {
    if (sealButton) { sealButton.style.transition = 'opacity 1s ease'; sealButton.style.opacity = '1'; }
  }, 600 + heroLines.length * 260 + 200);
  setTimeout(() => {
    if (scrollHint) { scrollHint.style.transition = 'opacity 1s ease'; scrollHint.style.opacity = '1'; }
  }, 600 + heroLines.length * 260 + 600);

  document.getElementById('beginBtn')?.addEventListener('click', () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------------------------------------------------------------
     1. Floating particles (soft light petals) — hero + finale
     --------------------------------------------------------------- */
  function startParticles(canvasId, count) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    function makeParticles() {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 2 + Math.random() * 3.5,
        speedY: 0.15 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 0.4,
        alpha: 0.15 + Math.random() * 0.35,
        hue: Math.random() > 0.5 ? '184,147,90' : '189,92,104' // gold or rose
      }));
    }
    window.addEventListener('resize', () => { resize(); });
    resize();
    makeParticles();

    function tick() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.drift;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    tick();
  }
  startParticles('particles', 46);
  startParticles('finaleParticles', 30);

  /* ---------------------------------------------------------------
     2. Scroll reveal (IntersectionObserver)
     --------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  revealEls.forEach(el => io.observe(el));

  /* ---------------------------------------------------------------
     3. Gold thread scroll progress
     --------------------------------------------------------------- */
  const threadFill = document.getElementById('threadFill');
  function updateThread() {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (scrolled / max) * 100 : 0;
    if (threadFill) threadFill.style.height = pct + '%';
  }
  window.addEventListener('scroll', updateThread, { passive: true });
  updateThread();

  /* ---------------------------------------------------------------
     4. Photo gallery lightbox
     --------------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  document.querySelectorAll('.polaroid img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightboxClose')?.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox?.classList.remove('open'); });

  /* ---------------------------------------------------------------
     5. Video gallery — custom play button, only one plays at a time
     --------------------------------------------------------------- */
  const filmCards = document.querySelectorAll('.film-card');
  filmCards.forEach(card => {
    const video = card.querySelector('.film-video');
    const playBtn = card.querySelector('.film-play');
    playBtn?.addEventListener('click', () => {
      filmCards.forEach(other => {
        if (other !== card) { other.classList.remove('playing'); other.querySelector('video')?.pause(); }
      });
      video.play();
      card.classList.add('playing');
    });
    video.addEventListener('pause', () => card.classList.remove('playing'));
    video.addEventListener('ended', () => card.classList.remove('playing'));
  });

  /* ---------------------------------------------------------------
     6. Voice notes — waveform bars + play/pause
     --------------------------------------------------------------- */
  document.querySelectorAll('.waveform').forEach(wf => {
    const barCount = 40;
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('span');
      const height = 4 + Math.round(Math.random() * 14);
      bar.style.height = height + 'px';
      bar.style.animationDelay = (Math.random() * 0.6) + 's';
      wf.appendChild(bar);
    }
  });

  const voiceNotes = document.querySelectorAll('.voice-note');
  voiceNotes.forEach(note => {
    const audio = note.querySelector('audio');
    const btn = note.querySelector('.voice-play');
    const iconPlay = btn.querySelector('.icon-play');
    const iconPause = btn.querySelector('.icon-pause');

    btn.addEventListener('click', () => {
      voiceNotes.forEach(other => {
        if (other !== note) {
          other.classList.remove('playing');
          other.querySelector('audio')?.pause();
          other.querySelector('.icon-play').style.display = '';
          other.querySelector('.icon-pause').style.display = 'none';
        }
      });
      if (audio.paused) {
        audio.play().catch(() => {});
        note.classList.add('playing');
        iconPlay.style.display = 'none';
        iconPause.style.display = '';
      } else {
        audio.pause();
        note.classList.remove('playing');
        iconPlay.style.display = '';
        iconPause.style.display = 'none';
      }
    });
    audio.addEventListener('ended', () => {
      note.classList.remove('playing');
      iconPlay.style.display = '';
      iconPause.style.display = 'none';
    });
  });

  /* ---------------------------------------------------------------
     7. Letter — handwriting typing animation (plays once, on scroll)
     --------------------------------------------------------------- */
  const letterEl = document.getElementById('letterText');
  if (letterEl) {
    const fullText = letterEl.getAttribute('data-full') || letterEl.textContent;
    letterEl.textContent = '';
    let typed = false;

    const letterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !typed) {
          typed = true;
          typeLetter(fullText, letterEl);
          letterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    letterObserver.observe(letterEl);
  }

  function typeLetter(text, el) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '\u00A0';

    function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        el.appendChild(cursor);
        i++;
        // slightly randomized speed feels more handwritten
        setTimeout(step, 16 + Math.random() * 26);
      } else {
        cursor.remove();
      }
    }
    step();
  }

  /* ---------------------------------------------------------------
     8. Background music player
     --------------------------------------------------------------- */
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicPlayer = document.getElementById('musicPlayer');
  const musicVolume = document.getElementById('musicVolume');

  if (bgMusic && musicToggle) {
    bgMusic.volume = parseFloat(musicVolume.value);

    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {
          console.warn('Add your song file to assets/music/our-song.mp3 for background music to play.');
        });
        musicPlayer.classList.add('playing');
        musicToggle.querySelector('.icon-play').style.display = 'none';
        musicToggle.querySelector('.icon-pause').style.display = '';
      } else {
        bgMusic.pause();
        musicPlayer.classList.remove('playing');
        musicToggle.querySelector('.icon-play').style.display = '';
        musicToggle.querySelector('.icon-pause').style.display = 'none';
      }
    });

    musicVolume.addEventListener('input', () => {
      bgMusic.volume = parseFloat(musicVolume.value);
    });
  }

});
