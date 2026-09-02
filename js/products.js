/* ============================================
   FBT OUTLET — Product catalog + card renderer
   ============================================ */

const PRODUCTS = [
  { id: 'p01', name: 'Velocity Pro Tee', cat: 'Koszulki', price: 89, old: 149, tag: '-40%', tagType: 'sale', stars: 5, gradient: 'linear-gradient(135deg,#2a0409,#1c1c22)' },
  { id: 'p02', name: 'Apex Track Jacket', cat: 'Bluzy', price: 259, old: 399, tag: 'HIT', tagType: 'hit', stars: 5, gradient: 'linear-gradient(135deg,#1c1c22,#320810)' },
  { id: 'p03', name: 'Redline Joggers', cat: 'Spodnie', price: 179, old: 249, tag: '-28%', tagType: 'sale', stars: 4, gradient: 'linear-gradient(135deg,#151519,#2a0409)' },
  { id: 'p04', name: 'Surge Windbreaker', cat: 'Kurtki', price: 329, old: 449, tag: 'NOWOŚĆ', tagType: 'new', stars: 5, gradient: 'linear-gradient(135deg,#2a0409,#0f0f12)' },
  { id: 'p05', name: 'Boost Runner GT', cat: 'Obuwie', price: 419, old: 599, tag: '-30%', tagType: 'sale', stars: 5, gradient: 'linear-gradient(135deg,#1c1c22,#2a0409)' },
  { id: 'p06', name: 'Torque Cap', cat: 'Akcesoria', price: 69, old: 99, tag: 'HIT', tagType: 'hit', stars: 4, gradient: 'linear-gradient(135deg,#320810,#151519)' },
  { id: 'p07', name: 'Nitro Compression', cat: 'Koszulki', price: 119, old: 169, tag: '-29%', tagType: 'sale', stars: 5, gradient: 'linear-gradient(135deg,#0f0f12,#2a0409)' },
  { id: 'p08', name: 'Drift Cargo Pants', cat: 'Spodnie', price: 219, old: 299, tag: 'NOWOŚĆ', tagType: 'new', stars: 4, gradient: 'linear-gradient(135deg,#2a0409,#1c1c22)' },
  { id: 'p09', name: 'Ignite Hoodie', cat: 'Bluzy', price: 199, old: 279, tag: '-28%', tagType: 'sale', stars: 5, gradient: 'linear-gradient(135deg,#1c1c22,#320810)' },
  { id: 'p10', name: 'Sprint Shorts 2.0', cat: 'Spodnie', price: 99, old: 139, tag: 'HIT', tagType: 'hit', stars: 4, gradient: 'linear-gradient(135deg,#151519,#2a0409)' },
  { id: 'p11', name: 'Carbon Duffel Bag', cat: 'Akcesoria', price: 289, old: 399, tag: '-27%', tagType: 'sale', stars: 5, gradient: 'linear-gradient(135deg,#2a0409,#0f0f12)' },
  { id: 'p12', name: 'Phantom Trail Shoe', cat: 'Obuwie', price: 379, old: 529, tag: 'NOWOŚĆ', tagType: 'new', stars: 5, gradient: 'linear-gradient(135deg,#1c1c22,#2a0409)' },
];

function starStr(n) { return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n); }

function productCard(p) {
  const tagClass = p.tagType === 'sale' ? '' : 'grey';
  return `
  <article class="product-card reveal" data-product="${p.id}" data-name="${p.name}" data-price="${p.price}">
    <div class="product-media" style="background:${p.gradient}">
      <div class="product-badges">
        <span class="tag ${p.tagType === 'sale' ? '' : 'grey'}">${p.tag}</span>
      </div>
      <button class="product-fav" aria-label="Dodaj do ulubionych">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <a href="product.html" class="product-quick" data-add="${p.id}" data-name="${p.name}" data-price="${p.price}">Szybki podgląd</a>
    </div>
    <div class="product-info">
      <div class="product-cat">${p.cat}</div>
      <h3 class="product-name"><a href="product.html">${p.name}</a></h3>
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

// Homepage featured (first 8)
renderProducts('#featured-products', PRODUCTS.slice(0, 8));

// Shop page (all) + filtering
const shopGrid = '#shop-products';
if (document.querySelector(shopGrid)) {
  let active = 'Wszystkie';
  const draw = () => renderProducts(shopGrid, active === 'Wszystkie' ? PRODUCTS : PRODUCTS.filter(p => p.cat === active));
  draw();
  document.querySelectorAll('.chip[data-cat]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-cat]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      active = chip.dataset.cat;
      draw();
      const count = active === 'Wszystkie' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === active).length;
      const ct = document.querySelector('.count-txt strong'); if (ct) ct.textContent = count;
    });
  });
  // sort
  document.querySelector('#sort')?.addEventListener('change', (e) => {
    let list = active === 'Wszystkie' ? [...PRODUCTS] : PRODUCTS.filter(p => p.cat === active);
    if (e.target.value === 'low') list.sort((a, b) => a.price - b.price);
    if (e.target.value === 'high') list.sort((a, b) => b.price - a.price);
    renderProducts(shopGrid, list);
  });
}
