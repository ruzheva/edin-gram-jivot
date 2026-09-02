(() => {
  const languages = [
    ['bg','Български','🇧🇬'],
    ['en','English','🇬🇧'],
    ['es','Español','🇪🇸'],
    ['fr','Français','🇫🇷'],
    ['de','Deutsch','🇩🇪'],
    ['ru','Русский','🇷🇺'],
    ['zh','中文','🇨🇳'],
    ['ar','العربية','🇸🇦'],
    ['pt','Português','🇵🇹'],
    ['it','Italiano','🇮🇹'],
    ['tr','Türkçe','🇹🇷'],
    ['ro','Română','🇷🇴'],
    ['el','Ελληνικά','🇬🇷'],
    ['sr','Српски','🇷🇸'],
    ['mk','Македонски','🇲🇰']
  ];

  const base = '/edin-gram-jivot/';
  const path = window.location.pathname;
  if (!path.startsWith(base)) return;

  const rest = path.slice(base.length).replace(/^\/+|\/+$/g, '');
  const parts = rest ? rest.split('/') : [];
  const localeSet = new Set(languages.map(x => x[0]).filter(x => x !== 'bg'));
  const currentLang = parts.length && localeSet.has(parts[0]) ? parts[0] : 'bg';
  const page = currentLang === 'bg'
    ? (parts[0] || 'index.html')
    : (parts[1] || 'index.html');

  const hrefFor = (lang) => {
    if (lang === 'bg') return page === 'index.html' ? base : base + page;
    return page === 'index.html' ? `${base}${lang}/` : `${base}${lang}/${page}`;
  };

  const current = languages.find(x => x[0] === currentLang) || languages[0];

  const style = document.createElement('style');
  style.textContent = `
    .egl-lang-switcher{position:relative;flex:0 0 auto;z-index:9999;font-family:inherit;display:flex;align-items:center}
    .egl-lang-button{min-height:38px;display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid rgba(12,129,146,.25);background:#fff;color:#173d45;padding:8px 12px;border-radius:999px;font:inherit;font-size:.86rem;font-weight:800;cursor:pointer;line-height:1;white-space:nowrap}
    .egl-lang-button:hover,.egl-lang-button:focus{outline:none;border-color:#0c8192;background:#eefafa}
    .egl-lang-menu{display:none;position:fixed;z-index:10000;width:215px;max-height:min(70vh,520px);overflow:auto;background:#fff;border:1px solid #d8ecec;border-radius:16px;padding:7px;box-shadow:0 16px 40px rgba(0,0,0,.18)}
    .egl-lang-switcher.open .egl-lang-menu{display:block}
    .egl-lang-menu a{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;color:#173d45;text-decoration:none;font-weight:700;font-size:14px;white-space:nowrap}
    .egl-lang-menu a:hover,.egl-lang-menu a:focus{background:#eefafa;outline:none}
    .egl-lang-menu a[aria-current="page"]{background:#e3f7f3;color:#087a8c}
    .egl-lang-code{margin-left:auto;color:#61777c;font-size:11px;text-transform:uppercase}
    html[dir="rtl"] .egl-lang-code{margin-left:0;margin-right:auto}
    .egl-lang-switcher-fallback{position:fixed;top:88px;right:18px}
    html[dir="rtl"] .egl-lang-switcher-fallback{right:auto;left:18px}
    @media(max-width:900px){
      .egl-lang-switcher{min-height:44px}
      .egl-lang-button{min-height:44px;padding:9px 13px;font-size:.82rem}
      .egl-lang-label{display:inline}
    }
    @media(max-width:600px){
      .egl-lang-button{padding:8px 11px;font-size:.8rem}
      .egl-lang-label{display:none}
    }
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.className = 'egl-lang-switcher';
  wrap.innerHTML = `
    <button class="egl-lang-button" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Choose language">
      <span aria-hidden="true">🌐</span><span class="egl-lang-label">${current[2]} ${current[1]}</span><span aria-hidden="true">▾</span>
    </button>
    <div class="egl-lang-menu" role="menu"></div>`;

  const menu = wrap.querySelector('.egl-lang-menu');
  for (const [code,name,flag] of languages) {
    const a = document.createElement('a');
    a.href = hrefFor(code);
    a.setAttribute('hreflang', code);
    a.setAttribute('lang', code);
    a.setAttribute('role', 'menuitem');
    if (code === currentLang) a.setAttribute('aria-current', 'page');
    a.innerHTML = `<span aria-hidden="true">${flag}</span><span>${name}</span><span class="egl-lang-code">${code}</span>`;
    menu.appendChild(a);
  }

  const navLinks = document.querySelector('header nav .links') || document.querySelector('nav .links');
  if (navLinks) {
    navLinks.appendChild(wrap);
  } else {
    wrap.classList.add('egl-lang-switcher-fallback');
    document.body.appendChild(wrap);
  }

  const button = wrap.querySelector('.egl-lang-button');
  const positionMenu = () => {
    if (!wrap.classList.contains('open')) return;
    const rect = button.getBoundingClientRect();
    const menuWidth = menu.offsetWidth || 215;
    const margin = 8;
    let left;
    if (document.documentElement.dir === 'rtl') {
      left = Math.max(margin, Math.min(rect.left, window.innerWidth - menuWidth - margin));
    } else {
      left = Math.max(margin, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - margin));
    }
    menu.style.left = `${left}px`;
    menu.style.right = 'auto';
    menu.style.top = `${Math.min(rect.bottom + 8, window.innerHeight - 60)}px`;
  };

  const setOpen = (open) => {
    wrap.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    if (open) requestAnimationFrame(positionMenu);
  };

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!wrap.classList.contains('open'));
  });
  document.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  menu.addEventListener('click', e => e.stopPropagation());
  window.addEventListener('resize', positionMenu);
  window.addEventListener('scroll', positionMenu, true);
})();
