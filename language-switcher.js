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
    .egl-lang-switcher{position:fixed;top:88px;right:18px;z-index:9999;font-family:Arial,system-ui,sans-serif}
    html[dir="rtl"] .egl-lang-switcher{right:auto;left:18px}
    .egl-lang-button{display:flex;align-items:center;gap:8px;border:1px solid rgba(12,129,146,.25);background:rgba(255,255,255,.97);color:#173d45;padding:9px 12px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.12);font-weight:800;cursor:pointer;line-height:1}
    .egl-lang-button:hover,.egl-lang-button:focus{outline:none;border-color:#0c8192;box-shadow:0 8px 26px rgba(12,129,146,.2)}
    .egl-lang-menu{display:none;position:absolute;top:46px;right:0;width:215px;max-height:min(70vh,520px);overflow:auto;background:#fff;border:1px solid #d8ecec;border-radius:16px;padding:7px;box-shadow:0 16px 40px rgba(0,0,0,.18)}
    html[dir="rtl"] .egl-lang-menu{right:auto;left:0}
    .egl-lang-switcher.open .egl-lang-menu{display:block}
    .egl-lang-menu a{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;color:#173d45;text-decoration:none;font-weight:700;font-size:14px;white-space:nowrap}
    .egl-lang-menu a:hover,.egl-lang-menu a:focus{background:#eefafa;outline:none}
    .egl-lang-menu a[aria-current="page"]{background:#e3f7f3;color:#087a8c}
    .egl-lang-code{margin-left:auto;color:#61777c;font-size:11px;text-transform:uppercase}
    html[dir="rtl"] .egl-lang-code{margin-left:0;margin-right:auto}
    @media(max-width:700px){.egl-lang-switcher{top:72px;right:10px}.egl-lang-button{padding:8px 10px}.egl-lang-label{display:none}.egl-lang-menu{width:205px;max-height:65vh}html[dir="rtl"] .egl-lang-switcher{right:auto;left:10px}}
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

  const button = wrap.querySelector('.egl-lang-button');
  const setOpen = (open) => {
    wrap.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
  };
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!wrap.classList.contains('open'));
  });
  document.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  menu.addEventListener('click', e => e.stopPropagation());

  document.body.appendChild(wrap);
})();
