/* ============================================================
   layout.page — shared left nav (collapsible icon rail)
   Renders into <aside id="lp-nav">. Active item comes from
   <body data-page="..">. Collapse state persists in localStorage.
   ============================================================ */
(function(){
  var ITEMS = [
    {type:'link', page:'overview',    href:'index.html',          label:'Overview',        icon:'layout-dashboard'},
    {type:'section', label:'Library'},
    {type:'link', page:'sections',    href:'section-library.html', label:'Browse Sections', icon:'layout-grid'},
    {type:'link', page:'styles',      href:'style-systems.html',   label:'Design Systems',  icon:'swatch-book'},
    {type:'link', page:'layouts',     href:'page-layouts.html',    label:'Page Layouts',    icon:'layout-template'},
    {type:'link', page:'collections', href:'#',                    label:'Collections',     icon:'library'},
    {type:'section', label:'Resources', foot:true},
    {type:'link', page:'docs',        href:'docs.html',            label:'Docs',            icon:'book-open'},
    {type:'link', page:'changelog',   href:'changelog.html',       label:'Changelog',       icon:'history'}
    /* Style Guide (styleguide.html) is intentionally NOT in the nav — internal-only reference, not shipped to visitors */
  ];

  var mount = document.getElementById('lp-nav');
  if(!mount) return;
  mount.classList.remove('hidden','md:flex'); // CSS controls desktop sidebar vs mobile drawer
  var active = document.body.getAttribute('data-page') || '';

  function icon(name,cls){ return '<i data-lucide="'+name+'" class="'+(cls||'')+'"></i>'; }

  var links = ITEMS.map(function(it){
    if(it.type==='section'){
      return '<div class="navsection'+(it.foot?' navsection-foot':'')+'"><span class="navlabel">'+it.label+'</span></div>';
    }
    var cls = 'navlink'+(it.top?' navtop':'')+(it.page===active?' active':'');
    return '<a class="'+cls+'" href="'+it.href+'" data-label="'+it.label+'">'+
             icon(it.icon,'navicon')+'<span class="navlabel">'+it.label+'</span></a>';
  }).join('');

  var root = document.documentElement;
  // restore saved collapsed state
  try{ if(localStorage.getItem('lp-nav-collapsed')==='1') root.classList.add('nav-collapsed'); }catch(e){}

  mount.innerHTML =
    '<div class="lp-nav-head">'+
      '<a class="lp-logo" href="index.html" aria-label="layout.page home">'+
        '<span class="lp-logo-mark"></span><span class="logo navlabel">LAYOUT.PAGE</span>'+
      '</a>'+
      '<button class="lp-collapse" id="lpCollapse" aria-label="Toggle sidebar">'+icon('corner-down-right','ico')+'</button>'+
    '</div>'+
    '<nav class="lp-links">'+links+'</nav>'+
    '<div class="lp-nav-foot">'+
      '<a class="lp-login" href="#" data-label="Log in">'+icon('log-in','navicon')+'<span class="navlabel">Log in</span></a>'+
      '<button id="themeToggle" class="themebtn" aria-label="Toggle theme">'+icon('moon','ico')+'</button>'+
    '</div>';

  function syncThemeIcon(){
    var dark = root.getAttribute('data-theme')==='dark';
    var t = document.getElementById('themeToggle');
    t.innerHTML = '<i data-lucide="'+(dark?'sun':'moon')+'" id="themeIcon" class="ico"></i>';
  }
  function draw(){ if(window.lucide) lucide.createIcons({attrs:{'stroke-width':1.25,width:16,height:16}}); }

  var collapseBtn = document.getElementById('lpCollapse');
  collapseBtn.setAttribute('aria-expanded', String(!root.classList.contains('nav-collapsed')));
  collapseBtn.addEventListener('click', function(){
    var collapsed = root.classList.toggle('nav-collapsed');
    collapseBtn.setAttribute('aria-expanded', String(!collapsed));
    try{ localStorage.setItem('lp-nav-collapsed', collapsed?'1':'0'); }catch(e){}
  });
  document.getElementById('themeToggle').addEventListener('click', function(){
    var dark = root.getAttribute('data-theme')==='dark';
    if(dark) root.removeAttribute('data-theme'); else root.setAttribute('data-theme','dark');
    try{ localStorage.setItem('lp-theme', dark?'light':'dark'); }catch(e){}
    syncThemeIcon(); draw();
  });

  // ---- shared top bar + footer (part of the page template) ----
  var FOOTER_HTML =
    '<div class="lp-footer"><div class="lp-footer-card">'+
      '<div class="lp-footer-cols">'+
        '<div class="lp-footer-col"><div class="lbl">Categories</div>'+
          '<a href="hero.html">Hero</a><a href="faq.html">FAQ</a>'+
          '<a href="section-library.html">Headers</a><a href="section-library.html">Footers</a></div>'+
        '<div class="lp-footer-col"><div class="lbl">Use with</div>'+
          '<a href="#">Claude</a><a href="#">Lovable</a><a href="#">Shopify</a><a href="#">Webflow</a></div>'+
        '<div class="lp-footer-col"><div class="lbl">Company</div>'+
          '<a href="#">About</a><a href="#">Docs</a><a href="#">License</a></div>'+
      '</div>'+
      '<div class="lp-footer-wordmark">layout<span>.</span>page</div>'+
    '</div></div>'+
    '<div class="lp-footer-bar"><span>© 2026 layout.page</span><span class="r">Made for marketers and designers</span></div>';

  var main = document.querySelector('main');
  if(main){
    var title = document.body.getAttribute('data-title');
    var crumbHref = document.body.getAttribute('data-crumb-href');
    if(title && !main.querySelector('.lp-topbar')){
      var tb = document.createElement('div');
      tb.className = 'lp-topbar';
      var left;
      if(title.indexOf(' / ') > -1 && crumbHref){
        var parts = title.split(' / ');
        var last = parts.pop();
        left = '<a class="lp-crumb" href="'+crumbHref+'">'+parts.join(' / ')+'</a><span class="lp-crumb-sep">/</span><span>'+last+'</span>';
      } else {
        left = '<span>'+title+'</span>';
      }
      // optional right-side action buttons: data-topbar-actions="Label|href, Label|href" (last = primary)
      var actions = document.body.getAttribute('data-topbar-actions');
      var right = '';
      if(actions){
        var items = actions.split(',');
        right = '<div class="lp-topbar-actions">' + items.map(function(a){
          var p = a.split('|'); var label = (p[0]||'').trim(); var href = (p[1]||'#').trim();
          return '<a class="lp-topbar-btn" href="'+href+'"><i data-lucide="corner-down-right" class="ico"></i>'+label+'</a>';
        }).join('') + '</div>';
      }
      tb.innerHTML = '<div class="lp-topbar-left">'+left+'</div>' + right;
      main.insertBefore(tb, main.firstChild);
    }
    if(!main.querySelector('.lp-footer-wrap')){
      var f = document.createElement('footer');
      f.className = 'lp-footer-wrap';
      f.innerHTML = FOOTER_HTML;
      main.appendChild(f);
    }
    // mobile top bar (logo + menu) — shown only on small screens (CSS); opens the drawer
    if(!main.querySelector('.lp-mobile-bar')){
      var mb = document.createElement('div');
      mb.className = 'lp-mobile-bar';
      mb.innerHTML =
        '<a class="lp-logo" href="index.html" aria-label="layout.page home"><span class="lp-logo-mark"></span><span class="logo">LAYOUT.PAGE</span></a>'+
        '<button class="lp-menu" id="lpMenu" aria-label="Open menu">'+icon('menu','ico')+'</button>';
      main.insertBefore(mb, main.firstChild);
    }
  }
  if(!document.getElementById('lpBackdrop')){
    var bd = document.createElement('div'); bd.id = 'lpBackdrop'; bd.className = 'lp-nav-backdrop';
    document.body.appendChild(bd);
  }

  // ---- mobile drawer open/close ----
  function closeNav(){ root.classList.remove('nav-open'); }
  var menuBtn = document.getElementById('lpMenu');
  if(menuBtn) menuBtn.addEventListener('click', function(){ root.classList.toggle('nav-open'); });
  var backdropEl = document.getElementById('lpBackdrop');
  if(backdropEl) backdropEl.addEventListener('click', closeNav);
  mount.addEventListener('click', function(e){ if(e.target.closest('a')) closeNav(); });

  syncThemeIcon(); draw();
})();
