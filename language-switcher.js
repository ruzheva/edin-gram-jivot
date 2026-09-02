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
  const page = currentLang === 'bg' ? (parts[0] || 'index.html') : (parts[1] || 'index.html');

  const hrefFor = (lang) => {
    if (lang === 'bg') return page === 'index.html' ? base : base + page;
    return page === 'index.html' ? `${base}${lang}/` : `${base}${lang}/${page}`;
  };

  const current = languages.find(x => x[0] === currentLang) || languages[0];

  const style = document.createElement('style');
  style.textContent = `
    .egl-lang-switcher{position:relative;flex:0 0 auto;z-index:9999;font-family:inherit;display:inline-flex;align-items:center;align-self:center}
    .egl-lang-button{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:0;background:transparent;color:inherit;padding:0;font:inherit;font-weight:800;cursor:pointer;line-height:1.2;white-space:nowrap}
    .egl-lang-button:hover,.egl-lang-button:focus{outline:none;color:#0c8192}
    .egl-lang-menu{display:none;position:fixed;z-index:10000;width:215px;max-height:min(70vh,520px);overflow:auto;background:#fff;border:1px solid #d8ecec;border-radius:16px;padding:7px;box-shadow:0 16px 40px rgba(0,0,0,.18)}
    .egl-lang-switcher.open .egl-lang-menu{display:block}
    .egl-lang-menu a{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;color:#173d45;text-decoration:none;font-weight:700;font-size:14px;white-space:nowrap}
    .egl-lang-menu a:hover,.egl-lang-menu a:focus{background:#eefafa;outline:none}
    .egl-lang-menu a[aria-current="page"]{background:#e3f7f3;color:#087a8c}
    .egl-lang-code{margin-left:auto;color:#61777c;font-size:11px;text-transform:uppercase}
    html[dir="rtl"] .egl-lang-code{margin-left:0;margin-right:auto}
    .egl-lang-switcher-fallback{position:fixed;top:88px;right:18px;background:#fff;padding:9px 12px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.12)}
    html[dir="rtl"] .egl-lang-switcher-fallback{right:auto;left:18px}

    /* Film artwork: always centered and fully visible */
    .posterWrap{display:flex!important;align-items:center!important;justify-content:center!important;padding:28px!important;overflow:hidden!important}
    .posterWrap .poster{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;object-position:center center!important;margin:auto!important}
    .filmPoster{display:flex!important;align-items:center!important;justify-content:center!important;min-width:0!important}
    .filmPoster img{display:block!important;width:auto!important;height:auto!important;max-width:100%!important;max-height:580px!important;object-fit:contain!important;object-position:center center!important;margin:auto!important}

    @media(min-width:901px){
      header nav .links, nav .links{display:flex!important;align-items:center!important;flex-wrap:nowrap!important}
      header nav .links .egl-lang-switcher, nav .links .egl-lang-switcher{display:inline-flex!important;align-items:center!important;height:auto!important;margin:0!important;position:relative!important;top:auto!important;right:auto!important;left:auto!important}
      header nav .links .egl-lang-button, nav .links .egl-lang-button{display:inline-flex!important;align-items:center!important;min-height:0!important;padding:0!important;margin:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;font-size:inherit!important;font-weight:800!important;color:inherit!important;line-height:inherit!important}
      .egl-lang-label{display:inline!important}
      .posterWrap{right:2%!important;left:auto!important;top:28px!important;bottom:28px!important;width:48%!important}
    }

    @media(max-width:900px){
      .egl-lang-switcher{min-height:44px}
      .egl-lang-button{min-height:44px;padding:9px 13px;border:1px solid rgba(12,129,146,.25);border-radius:999px;background:#fff;color:#173d45;font-size:.82rem}
      .egl-lang-button:hover,.egl-lang-button:focus{background:#eefafa}
      .egl-lang-label{display:inline}
      .posterWrap{left:42%!important;right:4%!important;top:28px!important;bottom:150px!important;width:auto!important;padding:16px!important}
      .filmPoster{width:100%!important;max-width:620px!important;margin-left:auto!important;margin-right:auto!important}
      .filmPoster img{max-height:70vh!important}
    }
    @media(max-width:600px){
      .egl-lang-button{padding:8px 11px;font-size:.8rem}
      .egl-lang-label{display:none}
      .posterWrap{left:30%!important;right:2%!important;top:18px!important;bottom:155px!important;padding:10px!important}
      .posterWrap .poster{object-position:center center!important}
      .filmPoster img{max-height:65vh!important}
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
