/* ============================================
   FBT OUTLET - Product catalog + card renderer
   ============================================ */

/* FALLBACK_PRODUCTS is used when the backend API is unavailable (e.g. the
   database is not configured yet), so the storefront always renders. When the
   API responds, these are replaced by the live catalogue from the database. */
let PRODUCTS = [
  { id: 'p01', condition: 'Nowy', name: 'Velocity Pro Tee', cat: 'Koszulki', brand: 'Nike', price: 89, old: 149, tag: '-40%', tagType: 'sale', stars: 5, reviews: 96, color: 'Czarny', sizes: ['S','M','L','XL'], material: '92% poliester, 8% elastan', gradient: 'linear-gradient(135deg,#2a0409,#1c1c22)', desc: 'Lekka koszulka treningowa z oddychającej dzianiny, która odprowadza wilgoć i szybko schnie. Płaskie szwy nie ocierają, a smukły krój zapewnia pełną swobodę ruchu.' },
  { id: 'p02', condition: 'Używany', name: 'Apex Track Jacket', cat: 'Bluzy', brand: 'Adidas', price: 259, old: 399, tag: 'HIT', tagType: 'hit', stars: 5, reviews: 128, color: 'Czerwony', sizes: ['M','L','XL','XXL'], material: '88% poliester, 12% elastan', gradient: 'linear-gradient(135deg,#1c1c22,#320810)', desc: 'Techniczna bluza rozpinana zaprojektowana na intensywny wysiłek. Czterokierunkowo elastyczna tkanina odprowadza wilgoć, a detale odblaskowe zwiększają widoczność podczas wieczornych treningów.' },
  { id: 'p03', condition: 'Nowy', name: 'Redline Joggers', cat: 'Spodnie', brand: 'Puma', price: 179, old: 249, tag: '-28%', tagType: 'sale', stars: 4, reviews: 74, color: 'Czarny', sizes: ['S','M','L','XL'], material: '80% bawełna, 20% poliester', gradient: 'linear-gradient(135deg,#151519,#2a0409)', desc: 'Wygodne joggery o zwężanym kroju z miękkiej, drapanej dzianiny. Ściągacze przy kostkach i regulowany ściągacz w pasie trzymają fason przez cały dzień.' },
  { id: 'p04', condition: 'Nowy', name: 'Surge Windbreaker', cat: 'Kurtki', brand: 'Under Armour', price: 329, old: 449, tag: 'NOWOŚĆ', tagType: 'new', stars: 5, reviews: 41, color: 'Szary', sizes: ['M','L','XL'], material: '100% poliamid', gradient: 'linear-gradient(135deg,#2a0409,#0f0f12)', desc: 'Ultralekka wiatrówka, która chroni przed wiatrem i przelotnym deszczem. Składa się do własnej kieszeni - łatwo zabierzesz ją na każdy bieg.' },
  { id: 'p05', condition: 'Używany', name: 'Boost Runner GT', cat: 'Obuwie', brand: 'Adidas', price: 419, old: 599, tag: '-30%', tagType: 'sale', stars: 5, reviews: 152, color: 'Biały', sizes: ['M','L','XL','XXL'], material: 'Cholewka z siatki, podeszwa EVA', gradient: 'linear-gradient(135deg,#1c1c22,#2a0409)', desc: 'Buty do biegania z responsywną, sprężystą podeszwą, która zwraca energię przy każdym kroku. Przewiewna cholewka i stabilna pięta na długie dystanse.' },
  { id: 'p06', condition: 'Nowy', name: 'Torque Cap', cat: 'Akcesoria', brand: 'New Balance', price: 69, old: 99, tag: 'HIT', tagType: 'hit', stars: 4, reviews: 58, color: 'Czarny', sizes: ['S','M','L'], material: '100% bawełna', gradient: 'linear-gradient(135deg,#320810,#151519)', desc: 'Klasyczna czapka z regulowanym zapięciem i haftowanym logo. Lekka, oddychająca i idealna na trening w słońcu.' },
  { id: 'p07', condition: 'Używany', name: 'Nitro Compression', cat: 'Koszulki', brand: 'Under Armour', price: 119, old: 169, tag: '-29%', tagType: 'sale', stars: 5, reviews: 87, color: 'Czerwony', sizes: ['XS','S','M','L'], material: '84% poliamid, 16% elastan', gradient: 'linear-gradient(135deg,#0f0f12,#2a0409)', desc: 'Koszulka kompresyjna, która wspiera mięśnie i przyspiesza regenerację. Ściśle przylega do ciała, nie ograniczając ruchu.' },
  { id: 'p08', condition: 'Nowy', name: 'Drift Cargo Pants', cat: 'Spodnie', brand: 'Puma', price: 219, old: 299, tag: 'NOWOŚĆ', tagType: 'new', stars: 4, reviews: 33, color: 'Szary', sizes: ['M','L','XL','XXL'], material: '65% bawełna, 35% poliester', gradient: 'linear-gradient(135deg,#2a0409,#1c1c22)', desc: 'Miejskie spodnie bojówki z praktycznymi kieszeniami cargo i luźnym, nowoczesnym krojem. Trwały materiał sprawdzi się na co dzień i w podróży.' },
  { id: 'p09', condition: 'Używany', name: 'Ignite Hoodie', cat: 'Bluzy', brand: 'Nike', price: 199, old: 279, tag: '-28%', tagType: 'sale', stars: 5, reviews: 111, color: 'Czarny', sizes: ['S','M','L','XL','XXL'], material: '80% bawełna, 20% poliester', gradient: 'linear-gradient(135deg,#1c1c22,#320810)', desc: 'Ciepła bluza z kapturem z grubej, przyjemnej w dotyku dzianiny. Kangurowa kieszeń i podwójny kaptur dają komfort w chłodniejsze dni.' },
  { id: 'p10', condition: 'Nowy', name: 'Sprint Shorts 2.0', cat: 'Spodnie', brand: 'Reebok', price: 99, old: 139, tag: 'HIT', tagType: 'hit', stars: 4, reviews: 62, color: 'Biały', sizes: ['XS','S','M','L'], material: '100% poliester', gradient: 'linear-gradient(135deg,#151519,#2a0409)', desc: 'Lekkie spodenki do biegania z wszytą siateczką i kieszonką na klucz. Szybko schną i nie krępują ruchów na najszybszych odcinkach.' },
  { id: 'p11', condition: 'Używany', name: 'Carbon Duffel Bag', cat: 'Akcesoria', brand: 'Nike', price: 289, old: 399, tag: '-27%', tagType: 'sale', stars: 5, reviews: 45, color: 'Czarny', sizes: ['M'], material: '100% poliester 600D', gradient: 'linear-gradient(135deg,#2a0409,#0f0f12)', desc: 'Pojemna torba treningowa z osobną komorą na buty i wzmacnianym dnem. Wygodne uchwyty i regulowany pasek na ramię ułatwiają noszenie.' },
  { id: 'p12', condition: 'Nowy', name: 'Phantom Trail Shoe', cat: 'Obuwie', brand: 'New Balance', price: 379, old: 529, tag: 'NOWOŚĆ', tagType: 'new', stars: 5, reviews: 39, color: 'Szary', sizes: ['M','L','XL'], material: 'Cholewka z siatki, bieżnik gumowy', gradient: 'linear-gradient(135deg,#1c1c22,#2a0409)', desc: 'Buty trailowe z agresywnym bieżnikiem, który trzyma się każdego podłoża. Wzmocniony nosek chroni stopę na wymagających trasach.' },
];

const BRANDS = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Under Armour'];

function getProduct(id) { return PRODUCTS.find(p => p.id === id); }
function getParam(name) { return new URLSearchParams(location.search).get(name); }

function starStr(n) { return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n); }

function productCard(p) {
  const tagClass = p.tagType === 'sale' ? '' : 'grey';
  return `
  <article class="product-card reveal" data-product="${p.id}" data-name="${p.name}" data-price="${p.price}">
    <div class="product-media" style="background:${p.gradient}">
      <div class="product-badges">
        <span class="tag ${p.tagType === 'sale' ? '' : 'grey'}">${p.tag}</span>
        <span class="tag cond ${p.condition === 'Używany' ? 'used' : 'new'}">${p.condition === 'Używany' ? 'Używane' : 'Nowe'}</span>
      </div>
      <button class="product-fav" aria-label="Dodaj do ulubionych">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <a href="product.html?id=${p.id}" class="product-quick">Szybki podgląd</a>
    </div>
    <div class="product-info">
      <div class="product-cat">${p.brand ? p.brand + ' · ' : ''}${p.cat}</div>
      <h3 class="product-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="product-foot">
        <div class="product-price">${p.price} zł <span class="old">${p.old} zł</span></div>
        <div class="product-stars">${starStr(p.stars)}</div>
      </div>
    </div>
  </article>`;
}

function renderProducts(selector, list) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = list.map(productCard).join('');
  // re-bind reveal + add buttons for freshly injected cards
  el.querySelectorAll('.reveal').forEach((c, i) => { c.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(c); });
  el.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('[data-product]');
      addToCart({ id: card.dataset.product, name: card.dataset.name, price: +card.dataset.price, qty: 1 });
    });
  });
}

/* ---------- Product detail page (product.html?id=pXX) ---------- */
function renderProductDetail(id) {
  const p = getProduct(id) || PRODUCTS[0];
  const set = (sel, val) => { const el = document.querySelector(sel); if (el) el.textContent = val; };

  document.title = `${p.name} - FBT Outlet`;
  set('#pd-crumb', p.name);
  set('#pd-title', p.name);
  set('#pd-tag', p.tag);
  set('#pd-stars', starStr(p.stars));
  set('#pd-reviews', `${p.stars}.0 (${p.reviews} opinii)`);
  set('#pd-now', `${p.price} zł`);
  set('#pd-was', `${p.old} zł`);
  set('#pd-save', `Oszczędzasz ${p.old - p.price} zł`);
  set('#pd-desc', p.desc);
  set('#pd-code', `FBT-${p.id.toUpperCase()}-2026`);
  set('#pd-material', p.material);
  set('#pd-brand', p.brand);
  set('#pd-condition', p.condition === 'Używany' ? 'Używany' : 'Nowy');

  const tagEl = document.querySelector('#pd-tag');
  if (tagEl) tagEl.className = 'tag' + (p.tagType === 'sale' ? '' : ' grey');

  const mainImg = document.getElementById('pd-main-img');
  if (mainImg) mainImg.style.background = p.gradient;
  const logo = document.getElementById('pd-main-logo');
  if (logo) logo.alt = p.name;

  // sizes (first available selected by default)
  const sizesEl = document.getElementById('pd-sizes');
  if (sizesEl) {
    sizesEl.innerHTML = p.sizes.map((s, i) => `<span class="pd-size${i === 0 ? ' active' : ''}">${s}</span>`).join('');
    sizesEl.querySelectorAll('.pd-size').forEach(s => s.addEventListener('click', () => {
      sizesEl.querySelectorAll('.pd-size').forEach(x => x.classList.remove('active'));
      s.classList.add('active');
    }));
  }

  // add-to-cart data (handler is bound in main.js, reads these at click time)
  const addBtn = document.getElementById('pd-add');
  if (addBtn) { addBtn.dataset.add = p.id; addBtn.dataset.name = p.name; addBtn.dataset.price = p.price; }

  // related products (exclude current)
  renderProducts('#featured-products', PRODUCTS.filter(x => x.id !== p.id).slice(0, 4));
}

function initPage() {
if (document.getElementById('pd-title')) {
  renderProductDetail(getParam('id'));
} else {
  // Homepage featured (first 8)
  renderProducts('#featured-products', PRODUCTS.slice(0, 8));
}

/* ---------- Shop page: category / brand / size / price / color filters ---------- */
const shopGrid = '#shop-products';
if (document.querySelector(shopGrid)) {
  const state = { cat: 'Wszystkie', brand: 'Wszystkie', condition: 'Wszystkie', sizes: [], colors: [], ranges: [], sort: 'default' };

  const matches = (p) =>
    (state.cat === 'Wszystkie' || p.cat === state.cat) &&
    (state.brand === 'Wszystkie' || p.brand === state.brand) &&
    (state.condition === 'Wszystkie' || p.condition === state.condition) &&
    (state.sizes.length === 0 || p.sizes.some(s => state.sizes.includes(s))) &&
    (state.colors.length === 0 || state.colors.includes(p.color)) &&
    (state.ranges.length === 0 || state.ranges.some(r => p.price >= r.min && p.price < r.max));

  const draw = () => {
    let list = PRODUCTS.filter(matches);
    if (state.sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (state.sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    renderProducts(shopGrid, list);
    const ct = document.querySelector('.count-txt strong');
    if (ct) ct.textContent = list.length;
  };

  // keep category chip rows + sidebar radios in sync
  const setCategory = (cat) => {
    state.cat = cat;
    document.querySelectorAll('.chip[data-cat]').forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
    document.querySelectorAll('input[name="cat"]').forEach(r => { r.checked = r.value === cat; });
    draw();
  };

  document.querySelectorAll('.chip[data-cat]').forEach(chip =>
    chip.addEventListener('click', () => setCategory(chip.dataset.cat)));
  document.querySelectorAll('input[name="cat"]').forEach(radio =>
    radio.addEventListener('change', () => setCategory(radio.value)));

  // condition radios (single select)
  document.querySelectorAll('input[name="condition"]').forEach(radio =>
    radio.addEventListener('change', () => {
      state.condition = radio.value;
      draw();
    }));

  // brand chips (single select)
  document.querySelectorAll('.chip[data-brand]').forEach(chip =>
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-brand]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.brand = chip.dataset.brand;
      draw();
    }));

  // size chips (multi select)
  document.querySelectorAll('.chip[data-size]').forEach(chip =>
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      state.sizes = [...document.querySelectorAll('.chip[data-size].active')].map(c => c.dataset.size);
      draw();
    }));

  // color chips (multi select)
  document.querySelectorAll('.chip[data-color]').forEach(chip =>
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      state.colors = [...document.querySelectorAll('.chip[data-color].active')].map(c => c.dataset.color);
      draw();
    }));

  // price checkboxes (multi select)
  document.querySelectorAll('input[type="checkbox"][data-min]').forEach(cb =>
    cb.addEventListener('change', () => {
      state.ranges = [...document.querySelectorAll('input[type="checkbox"][data-min]:checked')]
        .map(c => ({ min: +c.dataset.min, max: +c.dataset.max }));
      draw();
    }));

  // sort
  document.querySelector('#sort')?.addEventListener('change', (e) => {
    state.sort = e.target.value;
    draw();
  });

  // dynamic category counts in sidebar
  document.querySelectorAll('[data-count-cat]').forEach(el => {
    const cat = el.dataset.countCat;
    el.textContent = cat === 'Wszystkie' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === cat).length;
  });

  // dynamic condition counts in sidebar
  document.querySelectorAll('[data-count-cond]').forEach(el => {
    const cond = el.dataset.countCond;
    el.textContent = cond === 'Wszystkie' ? PRODUCTS.length : PRODUCTS.filter(p => p.condition === cond).length;
  });

  draw();
}
}

/* Load the live catalogue from the backend, then render the page. Falls back
   to the bundled FALLBACK data above when the API or database is unavailable. */
fetch('/api/products', { cache: 'no-store' })
  .then(r => (r.ok ? r.json() : null))
  .then(data => {
    if (Array.isArray(data) && data.length) {
      PRODUCTS = data.map(p => ({ ...p, sizes: Array.isArray(p.sizes) ? p.sizes : [] }));
    }
  })
  .catch(() => { /* keep fallback catalogue */ })
  .finally(() => { initPage(); });
