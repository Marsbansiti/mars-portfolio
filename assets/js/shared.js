/* SHARED LOGIC: Cursor, Language, and Navigation */

// 1. LANGUAGE ENGINE
let currentLang = localStorage.getItem('portfolio-lang') || 'vi';

function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('portfolio-lang', lang);
  document.documentElement.lang = lang;

  // Update all elements with data-en and data-vi
  document.querySelectorAll('[data-en][data-vi]').forEach(el => {
    const translation = el.getAttribute(`data-${lang}`);
    if (translation !== null) {
      // Check if it contains HTML tags
      if (translation.includes('<') && translation.includes('>')) {
        el.innerHTML = translation;
      } else {
        el.textContent = textContentClean(translation);
      }
    }
  });

  // Update language toggle buttons
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.textContent = lang === 'vi' ? 'EN' : 'VI';
  }

  // Update specific nav links if they don't use data attributes
  const navTranslations = {
    'Home': { en: 'Home', vi: 'Trang chủ' },
    'Projects': { en: 'Projects', vi: 'Dự án' },
    'About me': { en: 'About me', vi: 'Về tôi' }
  };
}

function toggleLang() {
  const newLang = currentLang === 'vi' ? 'en' : 'vi';
  updateLanguage(newLang);
}

function textContentClean(text) {
  return text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

// 2. CURSOR LOGIC
function initCursor() {
  const C = document.getElementById('cur');
  const R = document.getElementById('cur-ring');
  if (!C || !R) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    C.style.left = mx + 'px';
    C.style.top = my + 'px';
  });

  function loop() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    R.style.left = rx + 'px';
    R.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  // Hover effects
  const hoverables = 'a, button, .pt, .fcta, .sarr, .s1-scroll, .s3-down, .nav-logo, .pi, .lang-btn';
  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener('mouseenter', () => {
      C.style.width = '4px'; C.style.height = '4px';
      R.style.width = '52px'; R.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
      C.style.width = '8px'; C.style.height = '8px';
      R.style.width = '38px'; R.style.height = '38px';
    });
  });
}

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  updateLanguage(currentLang);
  
  // Set active nav link based on current path
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (path.includes(href) && href !== 'index.html') {
      link.classList.add('active');
    } else if (path.endsWith('/') || path.endsWith('index.html')) {
      if (href === 'index.html') link.classList.add('active');
    }
  });
});
